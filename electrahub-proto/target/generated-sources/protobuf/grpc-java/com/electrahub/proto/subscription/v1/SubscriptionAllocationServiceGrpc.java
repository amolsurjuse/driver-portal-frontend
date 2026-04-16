package com.electrahub.proto.subscription.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/subscription/v1/subscription.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class SubscriptionAllocationServiceGrpc {

  private SubscriptionAllocationServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.subscription.v1.SubscriptionAllocationService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.CreateAllocationRequest,
      com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> getCreateAllocationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateAllocation",
      requestType = com.electrahub.proto.subscription.v1.CreateAllocationRequest.class,
      responseType = com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.CreateAllocationRequest,
      com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> getCreateAllocationMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.CreateAllocationRequest, com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> getCreateAllocationMethod;
    if ((getCreateAllocationMethod = SubscriptionAllocationServiceGrpc.getCreateAllocationMethod) == null) {
      synchronized (SubscriptionAllocationServiceGrpc.class) {
        if ((getCreateAllocationMethod = SubscriptionAllocationServiceGrpc.getCreateAllocationMethod) == null) {
          SubscriptionAllocationServiceGrpc.getCreateAllocationMethod = getCreateAllocationMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.CreateAllocationRequest, com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateAllocation"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.CreateAllocationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionAllocationServiceMethodDescriptorSupplier("CreateAllocation"))
              .build();
        }
      }
    }
    return getCreateAllocationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListAllocationsRequest,
      com.electrahub.proto.subscription.v1.ListAllocationsResponse> getListAllocationsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListAllocations",
      requestType = com.electrahub.proto.subscription.v1.ListAllocationsRequest.class,
      responseType = com.electrahub.proto.subscription.v1.ListAllocationsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListAllocationsRequest,
      com.electrahub.proto.subscription.v1.ListAllocationsResponse> getListAllocationsMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListAllocationsRequest, com.electrahub.proto.subscription.v1.ListAllocationsResponse> getListAllocationsMethod;
    if ((getListAllocationsMethod = SubscriptionAllocationServiceGrpc.getListAllocationsMethod) == null) {
      synchronized (SubscriptionAllocationServiceGrpc.class) {
        if ((getListAllocationsMethod = SubscriptionAllocationServiceGrpc.getListAllocationsMethod) == null) {
          SubscriptionAllocationServiceGrpc.getListAllocationsMethod = getListAllocationsMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.ListAllocationsRequest, com.electrahub.proto.subscription.v1.ListAllocationsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListAllocations"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.ListAllocationsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.ListAllocationsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionAllocationServiceMethodDescriptorSupplier("ListAllocations"))
              .build();
        }
      }
    }
    return getListAllocationsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest,
      com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> getUpdateAllocationStatusMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "UpdateAllocationStatus",
      requestType = com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest.class,
      responseType = com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest,
      com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> getUpdateAllocationStatusMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest, com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> getUpdateAllocationStatusMethod;
    if ((getUpdateAllocationStatusMethod = SubscriptionAllocationServiceGrpc.getUpdateAllocationStatusMethod) == null) {
      synchronized (SubscriptionAllocationServiceGrpc.class) {
        if ((getUpdateAllocationStatusMethod = SubscriptionAllocationServiceGrpc.getUpdateAllocationStatusMethod) == null) {
          SubscriptionAllocationServiceGrpc.getUpdateAllocationStatusMethod = getUpdateAllocationStatusMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest, com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "UpdateAllocationStatus"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionAllocationServiceMethodDescriptorSupplier("UpdateAllocationStatus"))
              .build();
        }
      }
    }
    return getUpdateAllocationStatusMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static SubscriptionAllocationServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionAllocationServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionAllocationServiceStub>() {
        @java.lang.Override
        public SubscriptionAllocationServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionAllocationServiceStub(channel, callOptions);
        }
      };
    return SubscriptionAllocationServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static SubscriptionAllocationServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionAllocationServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionAllocationServiceBlockingStub>() {
        @java.lang.Override
        public SubscriptionAllocationServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionAllocationServiceBlockingStub(channel, callOptions);
        }
      };
    return SubscriptionAllocationServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static SubscriptionAllocationServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionAllocationServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionAllocationServiceFutureStub>() {
        @java.lang.Override
        public SubscriptionAllocationServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionAllocationServiceFutureStub(channel, callOptions);
        }
      };
    return SubscriptionAllocationServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void createAllocation(com.electrahub.proto.subscription.v1.CreateAllocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateAllocationMethod(), responseObserver);
    }

    /**
     */
    default void listAllocations(com.electrahub.proto.subscription.v1.ListAllocationsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.ListAllocationsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListAllocationsMethod(), responseObserver);
    }

    /**
     */
    default void updateAllocationStatus(com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getUpdateAllocationStatusMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service SubscriptionAllocationService.
   */
  public static abstract class SubscriptionAllocationServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return SubscriptionAllocationServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service SubscriptionAllocationService.
   */
  public static final class SubscriptionAllocationServiceStub
      extends io.grpc.stub.AbstractAsyncStub<SubscriptionAllocationServiceStub> {
    private SubscriptionAllocationServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionAllocationServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionAllocationServiceStub(channel, callOptions);
    }

    /**
     */
    public void createAllocation(com.electrahub.proto.subscription.v1.CreateAllocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateAllocationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listAllocations(com.electrahub.proto.subscription.v1.ListAllocationsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.ListAllocationsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListAllocationsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void updateAllocationStatus(com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getUpdateAllocationStatusMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service SubscriptionAllocationService.
   */
  public static final class SubscriptionAllocationServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<SubscriptionAllocationServiceBlockingStub> {
    private SubscriptionAllocationServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionAllocationServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionAllocationServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse createAllocation(com.electrahub.proto.subscription.v1.CreateAllocationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateAllocationMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.ListAllocationsResponse listAllocations(com.electrahub.proto.subscription.v1.ListAllocationsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListAllocationsMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse updateAllocationStatus(com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getUpdateAllocationStatusMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service SubscriptionAllocationService.
   */
  public static final class SubscriptionAllocationServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<SubscriptionAllocationServiceFutureStub> {
    private SubscriptionAllocationServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionAllocationServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionAllocationServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> createAllocation(
        com.electrahub.proto.subscription.v1.CreateAllocationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateAllocationMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.ListAllocationsResponse> listAllocations(
        com.electrahub.proto.subscription.v1.ListAllocationsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListAllocationsMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse> updateAllocationStatus(
        com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getUpdateAllocationStatusMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CREATE_ALLOCATION = 0;
  private static final int METHODID_LIST_ALLOCATIONS = 1;
  private static final int METHODID_UPDATE_ALLOCATION_STATUS = 2;

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
        case METHODID_CREATE_ALLOCATION:
          serviceImpl.createAllocation((com.electrahub.proto.subscription.v1.CreateAllocationRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse>) responseObserver);
          break;
        case METHODID_LIST_ALLOCATIONS:
          serviceImpl.listAllocations((com.electrahub.proto.subscription.v1.ListAllocationsRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.ListAllocationsResponse>) responseObserver);
          break;
        case METHODID_UPDATE_ALLOCATION_STATUS:
          serviceImpl.updateAllocationStatus((com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse>) responseObserver);
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
          getCreateAllocationMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.CreateAllocationRequest,
              com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse>(
                service, METHODID_CREATE_ALLOCATION)))
        .addMethod(
          getListAllocationsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.ListAllocationsRequest,
              com.electrahub.proto.subscription.v1.ListAllocationsResponse>(
                service, METHODID_LIST_ALLOCATIONS)))
        .addMethod(
          getUpdateAllocationStatusMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.UpdateAllocationStatusRequest,
              com.electrahub.proto.subscription.v1.SubscriptionAllocationResponse>(
                service, METHODID_UPDATE_ALLOCATION_STATUS)))
        .build();
  }

  private static abstract class SubscriptionAllocationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    SubscriptionAllocationServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.subscription.v1.SubscriptionProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("SubscriptionAllocationService");
    }
  }

  private static final class SubscriptionAllocationServiceFileDescriptorSupplier
      extends SubscriptionAllocationServiceBaseDescriptorSupplier {
    SubscriptionAllocationServiceFileDescriptorSupplier() {}
  }

  private static final class SubscriptionAllocationServiceMethodDescriptorSupplier
      extends SubscriptionAllocationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    SubscriptionAllocationServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (SubscriptionAllocationServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new SubscriptionAllocationServiceFileDescriptorSupplier())
              .addMethod(getCreateAllocationMethod())
              .addMethod(getListAllocationsMethod())
              .addMethod(getUpdateAllocationStatusMethod())
              .build();
        }
      }
    }
    return result;
  }
}
