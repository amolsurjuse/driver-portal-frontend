package com.electrahub.proto.subscription.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/subscription/v1/subscription.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class SubscriptionAuditServiceGrpc {

  private SubscriptionAuditServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.subscription.v1.SubscriptionAuditService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListAuditLogsRequest,
      com.electrahub.proto.subscription.v1.ListAuditLogsResponse> getListAuditLogsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListAuditLogs",
      requestType = com.electrahub.proto.subscription.v1.ListAuditLogsRequest.class,
      responseType = com.electrahub.proto.subscription.v1.ListAuditLogsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListAuditLogsRequest,
      com.electrahub.proto.subscription.v1.ListAuditLogsResponse> getListAuditLogsMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListAuditLogsRequest, com.electrahub.proto.subscription.v1.ListAuditLogsResponse> getListAuditLogsMethod;
    if ((getListAuditLogsMethod = SubscriptionAuditServiceGrpc.getListAuditLogsMethod) == null) {
      synchronized (SubscriptionAuditServiceGrpc.class) {
        if ((getListAuditLogsMethod = SubscriptionAuditServiceGrpc.getListAuditLogsMethod) == null) {
          SubscriptionAuditServiceGrpc.getListAuditLogsMethod = getListAuditLogsMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.ListAuditLogsRequest, com.electrahub.proto.subscription.v1.ListAuditLogsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListAuditLogs"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.ListAuditLogsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.ListAuditLogsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionAuditServiceMethodDescriptorSupplier("ListAuditLogs"))
              .build();
        }
      }
    }
    return getListAuditLogsMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static SubscriptionAuditServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionAuditServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionAuditServiceStub>() {
        @java.lang.Override
        public SubscriptionAuditServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionAuditServiceStub(channel, callOptions);
        }
      };
    return SubscriptionAuditServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static SubscriptionAuditServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionAuditServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionAuditServiceBlockingStub>() {
        @java.lang.Override
        public SubscriptionAuditServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionAuditServiceBlockingStub(channel, callOptions);
        }
      };
    return SubscriptionAuditServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static SubscriptionAuditServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionAuditServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionAuditServiceFutureStub>() {
        @java.lang.Override
        public SubscriptionAuditServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionAuditServiceFutureStub(channel, callOptions);
        }
      };
    return SubscriptionAuditServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void listAuditLogs(com.electrahub.proto.subscription.v1.ListAuditLogsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.ListAuditLogsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListAuditLogsMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service SubscriptionAuditService.
   */
  public static abstract class SubscriptionAuditServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return SubscriptionAuditServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service SubscriptionAuditService.
   */
  public static final class SubscriptionAuditServiceStub
      extends io.grpc.stub.AbstractAsyncStub<SubscriptionAuditServiceStub> {
    private SubscriptionAuditServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionAuditServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionAuditServiceStub(channel, callOptions);
    }

    /**
     */
    public void listAuditLogs(com.electrahub.proto.subscription.v1.ListAuditLogsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.ListAuditLogsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListAuditLogsMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service SubscriptionAuditService.
   */
  public static final class SubscriptionAuditServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<SubscriptionAuditServiceBlockingStub> {
    private SubscriptionAuditServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionAuditServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionAuditServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.ListAuditLogsResponse listAuditLogs(com.electrahub.proto.subscription.v1.ListAuditLogsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListAuditLogsMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service SubscriptionAuditService.
   */
  public static final class SubscriptionAuditServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<SubscriptionAuditServiceFutureStub> {
    private SubscriptionAuditServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionAuditServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionAuditServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.ListAuditLogsResponse> listAuditLogs(
        com.electrahub.proto.subscription.v1.ListAuditLogsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListAuditLogsMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_LIST_AUDIT_LOGS = 0;

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
        case METHODID_LIST_AUDIT_LOGS:
          serviceImpl.listAuditLogs((com.electrahub.proto.subscription.v1.ListAuditLogsRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.ListAuditLogsResponse>) responseObserver);
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
          getListAuditLogsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.ListAuditLogsRequest,
              com.electrahub.proto.subscription.v1.ListAuditLogsResponse>(
                service, METHODID_LIST_AUDIT_LOGS)))
        .build();
  }

  private static abstract class SubscriptionAuditServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    SubscriptionAuditServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.subscription.v1.SubscriptionProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("SubscriptionAuditService");
    }
  }

  private static final class SubscriptionAuditServiceFileDescriptorSupplier
      extends SubscriptionAuditServiceBaseDescriptorSupplier {
    SubscriptionAuditServiceFileDescriptorSupplier() {}
  }

  private static final class SubscriptionAuditServiceMethodDescriptorSupplier
      extends SubscriptionAuditServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    SubscriptionAuditServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (SubscriptionAuditServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new SubscriptionAuditServiceFileDescriptorSupplier())
              .addMethod(getListAuditLogsMethod())
              .build();
        }
      }
    }
    return result;
  }
}
