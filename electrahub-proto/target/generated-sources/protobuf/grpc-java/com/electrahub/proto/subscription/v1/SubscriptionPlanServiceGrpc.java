package com.electrahub.proto.subscription.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/subscription/v1/subscription.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class SubscriptionPlanServiceGrpc {

  private SubscriptionPlanServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.subscription.v1.SubscriptionPlanService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.CreatePlanRequest,
      com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> getCreatePlanMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreatePlan",
      requestType = com.electrahub.proto.subscription.v1.CreatePlanRequest.class,
      responseType = com.electrahub.proto.subscription.v1.SubscriptionPlanResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.CreatePlanRequest,
      com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> getCreatePlanMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.CreatePlanRequest, com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> getCreatePlanMethod;
    if ((getCreatePlanMethod = SubscriptionPlanServiceGrpc.getCreatePlanMethod) == null) {
      synchronized (SubscriptionPlanServiceGrpc.class) {
        if ((getCreatePlanMethod = SubscriptionPlanServiceGrpc.getCreatePlanMethod) == null) {
          SubscriptionPlanServiceGrpc.getCreatePlanMethod = getCreatePlanMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.CreatePlanRequest, com.electrahub.proto.subscription.v1.SubscriptionPlanResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreatePlan"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.CreatePlanRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.SubscriptionPlanResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionPlanServiceMethodDescriptorSupplier("CreatePlan"))
              .build();
        }
      }
    }
    return getCreatePlanMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.GetPlanRequest,
      com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> getGetPlanMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetPlan",
      requestType = com.electrahub.proto.subscription.v1.GetPlanRequest.class,
      responseType = com.electrahub.proto.subscription.v1.SubscriptionPlanResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.GetPlanRequest,
      com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> getGetPlanMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.GetPlanRequest, com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> getGetPlanMethod;
    if ((getGetPlanMethod = SubscriptionPlanServiceGrpc.getGetPlanMethod) == null) {
      synchronized (SubscriptionPlanServiceGrpc.class) {
        if ((getGetPlanMethod = SubscriptionPlanServiceGrpc.getGetPlanMethod) == null) {
          SubscriptionPlanServiceGrpc.getGetPlanMethod = getGetPlanMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.GetPlanRequest, com.electrahub.proto.subscription.v1.SubscriptionPlanResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetPlan"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.GetPlanRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.SubscriptionPlanResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionPlanServiceMethodDescriptorSupplier("GetPlan"))
              .build();
        }
      }
    }
    return getGetPlanMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListPlansRequest,
      com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse> getListPlansMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListPlans",
      requestType = com.electrahub.proto.subscription.v1.ListPlansRequest.class,
      responseType = com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListPlansRequest,
      com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse> getListPlansMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListPlansRequest, com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse> getListPlansMethod;
    if ((getListPlansMethod = SubscriptionPlanServiceGrpc.getListPlansMethod) == null) {
      synchronized (SubscriptionPlanServiceGrpc.class) {
        if ((getListPlansMethod = SubscriptionPlanServiceGrpc.getListPlansMethod) == null) {
          SubscriptionPlanServiceGrpc.getListPlansMethod = getListPlansMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.ListPlansRequest, com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListPlans"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.ListPlansRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionPlanServiceMethodDescriptorSupplier("ListPlans"))
              .build();
        }
      }
    }
    return getListPlansMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static SubscriptionPlanServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionPlanServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionPlanServiceStub>() {
        @java.lang.Override
        public SubscriptionPlanServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionPlanServiceStub(channel, callOptions);
        }
      };
    return SubscriptionPlanServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static SubscriptionPlanServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionPlanServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionPlanServiceBlockingStub>() {
        @java.lang.Override
        public SubscriptionPlanServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionPlanServiceBlockingStub(channel, callOptions);
        }
      };
    return SubscriptionPlanServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static SubscriptionPlanServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionPlanServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionPlanServiceFutureStub>() {
        @java.lang.Override
        public SubscriptionPlanServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionPlanServiceFutureStub(channel, callOptions);
        }
      };
    return SubscriptionPlanServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void createPlan(com.electrahub.proto.subscription.v1.CreatePlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreatePlanMethod(), responseObserver);
    }

    /**
     */
    default void getPlan(com.electrahub.proto.subscription.v1.GetPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetPlanMethod(), responseObserver);
    }

    /**
     */
    default void listPlans(com.electrahub.proto.subscription.v1.ListPlansRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListPlansMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service SubscriptionPlanService.
   */
  public static abstract class SubscriptionPlanServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return SubscriptionPlanServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service SubscriptionPlanService.
   */
  public static final class SubscriptionPlanServiceStub
      extends io.grpc.stub.AbstractAsyncStub<SubscriptionPlanServiceStub> {
    private SubscriptionPlanServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionPlanServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionPlanServiceStub(channel, callOptions);
    }

    /**
     */
    public void createPlan(com.electrahub.proto.subscription.v1.CreatePlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreatePlanMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getPlan(com.electrahub.proto.subscription.v1.GetPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetPlanMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listPlans(com.electrahub.proto.subscription.v1.ListPlansRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListPlansMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service SubscriptionPlanService.
   */
  public static final class SubscriptionPlanServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<SubscriptionPlanServiceBlockingStub> {
    private SubscriptionPlanServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionPlanServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionPlanServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.SubscriptionPlanResponse createPlan(com.electrahub.proto.subscription.v1.CreatePlanRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreatePlanMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.SubscriptionPlanResponse getPlan(com.electrahub.proto.subscription.v1.GetPlanRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetPlanMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse listPlans(com.electrahub.proto.subscription.v1.ListPlansRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListPlansMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service SubscriptionPlanService.
   */
  public static final class SubscriptionPlanServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<SubscriptionPlanServiceFutureStub> {
    private SubscriptionPlanServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionPlanServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionPlanServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> createPlan(
        com.electrahub.proto.subscription.v1.CreatePlanRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreatePlanMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.SubscriptionPlanResponse> getPlan(
        com.electrahub.proto.subscription.v1.GetPlanRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetPlanMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse> listPlans(
        com.electrahub.proto.subscription.v1.ListPlansRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListPlansMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CREATE_PLAN = 0;
  private static final int METHODID_GET_PLAN = 1;
  private static final int METHODID_LIST_PLANS = 2;

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
        case METHODID_CREATE_PLAN:
          serviceImpl.createPlan((com.electrahub.proto.subscription.v1.CreatePlanRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionPlanResponse>) responseObserver);
          break;
        case METHODID_GET_PLAN:
          serviceImpl.getPlan((com.electrahub.proto.subscription.v1.GetPlanRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionPlanResponse>) responseObserver);
          break;
        case METHODID_LIST_PLANS:
          serviceImpl.listPlans((com.electrahub.proto.subscription.v1.ListPlansRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse>) responseObserver);
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
          getCreatePlanMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.CreatePlanRequest,
              com.electrahub.proto.subscription.v1.SubscriptionPlanResponse>(
                service, METHODID_CREATE_PLAN)))
        .addMethod(
          getGetPlanMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.GetPlanRequest,
              com.electrahub.proto.subscription.v1.SubscriptionPlanResponse>(
                service, METHODID_GET_PLAN)))
        .addMethod(
          getListPlansMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.ListPlansRequest,
              com.electrahub.proto.subscription.v1.SubscriptionPlanSearchResponse>(
                service, METHODID_LIST_PLANS)))
        .build();
  }

  private static abstract class SubscriptionPlanServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    SubscriptionPlanServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.subscription.v1.SubscriptionProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("SubscriptionPlanService");
    }
  }

  private static final class SubscriptionPlanServiceFileDescriptorSupplier
      extends SubscriptionPlanServiceBaseDescriptorSupplier {
    SubscriptionPlanServiceFileDescriptorSupplier() {}
  }

  private static final class SubscriptionPlanServiceMethodDescriptorSupplier
      extends SubscriptionPlanServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    SubscriptionPlanServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (SubscriptionPlanServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new SubscriptionPlanServiceFileDescriptorSupplier())
              .addMethod(getCreatePlanMethod())
              .addMethod(getGetPlanMethod())
              .addMethod(getListPlansMethod())
              .build();
        }
      }
    }
    return result;
  }
}
