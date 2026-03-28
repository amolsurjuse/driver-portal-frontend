import Foundation

/// A single Server-Sent Event parsed from a text/event-stream.
struct SSEEvent {
    let event: String
    let data: String
}

/// Lightweight SSE (Server-Sent Events) client that returns an `AsyncStream<SSEEvent>`.
/// Handles the dev server's self-signed certificate via a delegate.
final class SSEClient: NSObject, URLSessionDataDelegate, URLSessionTaskDelegate {
    private let tokenProvider: () -> String?
    private var session: URLSession?
    private var dataTask: URLSessionDataTask?
    private var continuation: AsyncStream<SSEEvent>.Continuation?

    /// Buffer for incomplete lines arriving across multiple `didReceive data:` callbacks.
    private var buffer = ""

    /// Current event being assembled (SSE events can span multiple `data:` lines).
    private var currentEvent = ""
    private var currentData = ""

    init(tokenProvider: @escaping () -> String?) {
        self.tokenProvider = tokenProvider
    }

    /// Opens an SSE connection to the given URL and returns an async stream of events.
    func connect(url: URL) -> AsyncStream<SSEEvent> {
        let (stream, continuation) = AsyncStream<SSEEvent>.makeStream()
        self.continuation = continuation

        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = .infinity
        config.timeoutIntervalForResource = .infinity
        config.requestCachePolicy = .reloadIgnoringLocalAndRemoteCacheData

        let session = URLSession(configuration: config, delegate: self, delegateQueue: nil)
        self.session = session

        var request = URLRequest(url: url)
        request.setValue("text/event-stream", forHTTPHeaderField: "Accept")
        request.setValue("no-cache", forHTTPHeaderField: "Cache-Control")
        if let token = tokenProvider(), !token.isEmpty {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        let task = session.dataTask(with: request)
        self.dataTask = task
        task.resume()

        continuation.onTermination = { [weak self] _ in
            self?.disconnect()
        }

        return stream
    }

    /// Tears down the connection.
    func disconnect() {
        dataTask?.cancel()
        dataTask = nil
        session?.invalidateAndCancel()
        session = nil
        continuation?.finish()
        continuation = nil
    }

    // MARK: - URLSessionDataDelegate

    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
        guard let text = String(data: data, encoding: .utf8) else { return }
        buffer += text
        processBuffer()
    }

    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        continuation?.finish()
        continuation = nil
    }

    // MARK: - URLSessionTaskDelegate (SSL trust for dev server)

    func urlSession(
        _ session: URLSession,
        didReceive challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        trustChallenge(challenge, completionHandler: completionHandler)
    }

    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        didReceive challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        trustChallenge(challenge, completionHandler: completionHandler)
    }

    private func trustChallenge(
        _ challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        guard challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust,
              let serverTrust = challenge.protectionSpace.serverTrust else {
            completionHandler(.performDefaultHandling, nil)
            return
        }
        completionHandler(.useCredential, URLCredential(trust: serverTrust))
    }

    // MARK: - SSE Line Parsing

    private func processBuffer() {
        // SSE spec: lines are separated by \n, \r, or \r\n
        while let range = buffer.rangeOfCharacter(from: .newlines) {
            let line = String(buffer[buffer.startIndex..<range.lowerBound])
            buffer = String(buffer[range.upperBound...])

            // Skip \n after \r if it was \r\n
            if line.isEmpty && buffer.first == "\n" {
                buffer.removeFirst()
            }

            processLine(line)
        }
    }

    private func processLine(_ line: String) {
        if line.isEmpty {
            // Empty line = dispatch the event
            if !currentData.isEmpty {
                let event = SSEEvent(
                    event: currentEvent.isEmpty ? "message" : currentEvent,
                    data: currentData
                )
                continuation?.yield(event)
            }
            currentEvent = ""
            currentData = ""
        } else if line.hasPrefix("event:") {
            currentEvent = String(line.dropFirst(6)).trimmingCharacters(in: .whitespaces)
        } else if line.hasPrefix("data:") {
            let value = String(line.dropFirst(5)).trimmingCharacters(in: .whitespaces)
            if currentData.isEmpty {
                currentData = value
            } else {
                currentData += "\n" + value
            }
        }
        // Ignore "id:", "retry:", and comment lines starting with ":"
    }
}
