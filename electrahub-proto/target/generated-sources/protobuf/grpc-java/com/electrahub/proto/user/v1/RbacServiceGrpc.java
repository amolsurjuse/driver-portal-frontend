package com.electrahub.proto.user.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/user/v1/user.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class RbacServiceGrpc {

  private RbacServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.user.v1.RbacService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetPolicyRequest,
      com.electrahub.proto.user.v1.RbacPolicyResponse> getGetPolicyMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetPolicy",
      requestType = com.electrahub.proto.user.v1.GetPolicyRequest.class,
      responseType = com.electrahub.proto.user.v1.RbacPolicyResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetPolicyRequest,
      com.electrahub.proto.user.v1.RbacPolicyResponse> getGetPolicyMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetPolicyRequest, com.electrahub.proto.user.v1.RbacPolicyResponse> getGetPolicyMethod;
    if ((getGetPolicyMethod = RbacServiceGrpc.getGetPolicyMethod) == null) {
      synchronized (RbacServiceGrpc.class) {
        if ((getGetPolicyMethod = RbacServiceGrpc.getGetPolicyMethod) == null) {
          RbacServiceGrpc.getGetPolicyMethod = getGetPolicyMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.GetPolicyRequest, com.electrahub.proto.user.v1.RbacPolicyResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetPolicy"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.GetPolicyRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.RbacPolicyResponse.getDefaultInstance()))
              .setSchemaDescriptor(new RbacServiceMethodDescriptorSupplier("GetPolicy"))
              .build();
        }
      }
    }
    return getGetPolicyMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.StreamPolicyRequest,
      com.electrahub.proto.user.v1.RbacPolicyResponse> getStreamPolicyMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "StreamPolicy",
      requestType = com.electrahub.proto.user.v1.StreamPolicyRequest.class,
      responseType = com.electrahub.proto.user.v1.RbacPolicyResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.SERVER_STREAMING)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.StreamPolicyRequest,
      com.electrahub.proto.user.v1.RbacPolicyResponse> getStreamPolicyMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.StreamPolicyRequest, com.electrahub.proto.user.v1.RbacPolicyResponse> getStreamPolicyMethod;
    if ((getStreamPolicyMethod = RbacServiceGrpc.getStreamPolicyMethod) == null) {
      synchronized (RbacServiceGrpc.class) {
        if ((getStreamPolicyMethod = RbacServiceGrpc.getStreamPolicyMethod) == null) {
          RbacServiceGrpc.getStreamPolicyMethod = getStreamPolicyMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.StreamPolicyRequest, com.electrahub.proto.user.v1.RbacPolicyResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.SERVER_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "StreamPolicy"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.StreamPolicyRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.RbacPolicyResponse.getDefaultInstance()))
              .setSchemaDescriptor(new RbacServiceMethodDescriptorSupplier("StreamPolicy"))
              .build();
        }
      }
    }
    return getStreamPolicyMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static RbacServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<RbacServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<RbacServiceStub>() {
        @java.lang.Override
        public RbacServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new RbacServiceStub(channel, callOptions);
        }
      };
    return RbacServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static RbacServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<RbacServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<RbacServiceBlockingStub>() {
        @java.lang.Override
        public RbacServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new RbacServiceBlockingStub(channel, callOptions);
        }
      };
    return RbacServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static RbacServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<RbacServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<RbacServiceFutureStub>() {
        @java.lang.Override
        public RbacServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new RbacServiceFutureStub(channel, callOptions);
        }
      };
    return RbacServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     * <pre>
     * Fetch current RBAC policy snapshot (unary)
     * </pre>
     */
    default void getPolicy(com.electrahub.proto.user.v1.GetPolicyRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.RbacPolicyResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetPolicyMethod(), responseObserver);
    }

    /**
     * <pre>
     * Stream RBAC policy updates in real-time (server streaming)
     * </pre>
     */
    default void streamPolicy(com.electrahub.proto.user.v1.StreamPolicyRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.RbacPolicyResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getStreamPolicyMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service RbacService.
   */
  public static abstract class RbacServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return RbacServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service RbacService.
   */
  public static final class RbacServiceStub
      extends io.grpc.stub.AbstractAsyncStub<RbacServiceStub> {
    private RbacServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected RbacServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new RbacServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     * Fetch current RBAC policy snapshot (unary)
     * </pre>
     */
    public void getPolicy(com.electrahub.proto.user.v1.GetPolicyRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.RbacPolicyResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetPolicyMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Stream RBAC policy updates in real-time (server streaming)
     * </pre>
     */
    public void streamPolicy(com.electrahub.proto.user.v1.StreamPolicyRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.RbacPolicyResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncServerStreamingCall(
          getChannel().newCall(getStreamPolicyMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service RbacService.
   */
  public static final class RbacServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<RbacServiceBlockingStub> {
    private RbacServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected RbacServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new RbacServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Fetch current RBAC policy snapshot (unary)
     * </pre>
     */
    public com.electrahub.proto.user.v1.RbacPolicyResponse getPolicy(com.electrahub.proto.user.v1.GetPolicyRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetPolicyMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Stream RBAC policy updates in real-time (server streaming)
     * </pre>
     */
    public java.util.Iterator<com.electrahub.proto.user.v1.RbacPolicyResponse> streamPolicy(
        com.electrahub.proto.user.v1.StreamPolicyRequest request) {
      return io.grpc.stub.ClientCalls.blockingServerStreamingCall(
          getChannel(), getStreamPolicyMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service RbacService.
   */
  public static final class RbacServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<RbacServiceFutureStub> {
    private RbacServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected RbacServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new RbacServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Fetch current RBAC policy snapshot (unary)
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.RbacPolicyResponse> getPolicy(
        com.electrahub.proto.user.v1.GetPolicyRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetPolicyMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_GET_POLICY = 0;
  private static final int METHODID_STREAM_POLICY = 1;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AsyncService serviceImpl;
    private final int methodId;

    MethodHandlers(AsyncService serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_GET_POLICY:
          serviceImpl.getPolicy((com.electrahub.proto.user.v1.GetPolicyRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.RbacPolicyResponse>) responseObserver);
          break;
        case METHODID_STREAM_POLICY:
          serviceImpl.streamPolicy((com.electrahub.proto.user.v1.StreamPolicyRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.RbacPolicyResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  public static final io.grpc.ServerServiceDefinition bindService(AsyncService service) {
    return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
        .addMethod(
          getGetPolicyMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.GetPolicyRequest,
              com.electrahub.proto.user.v1.RbacPolicyResponse>(
                service, METHODID_GET_POLICY)))
        .addMethod(
          getStreamPolicyMethod(),
          io.grpc.stub.ServerCalls.asyncServerStreamingCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.StreamPolicyRequest,
              com.electrahub.proto.user.v1.RbacPolicyResponse>(
                service, METHODID_STREAM_POLICY)))
        .build();
  }

  private static abstract class RbacServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    RbacServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.user.v1.UserProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("RbacService");
    }
  }

  private static final class RbacServiceFileDescriptorSupplier
      extends RbacServiceBaseDescriptorSupplier {
    RbacServiceFileDescriptorSupplier() {}
  }

  private static final class RbacServiceMethodDescriptorSupplier
      extends RbacServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    RbacServiceMethodDescriptorSupplier(java.lang.String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (RbacServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new RbacServiceFileDescriptorSupplier())
              .addMethod(getGetPolicyMethod())
              .addMethod(getStreamPolicyMethod())
              .build();
        }
      }
    }
    return result;
  }
}
