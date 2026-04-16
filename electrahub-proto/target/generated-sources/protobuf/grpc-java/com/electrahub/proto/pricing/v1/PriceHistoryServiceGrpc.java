package com.electrahub.proto.pricing.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/pricing/v1/pricing.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class PriceHistoryServiceGrpc {

  private PriceHistoryServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.pricing.v1.PriceHistoryService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest,
      com.electrahub.proto.pricing.v1.ListPriceHistoryResponse> getListHistoryByPlanMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListHistoryByPlan",
      requestType = com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest.class,
      responseType = com.electrahub.proto.pricing.v1.ListPriceHistoryResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest,
      com.electrahub.proto.pricing.v1.ListPriceHistoryResponse> getListHistoryByPlanMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest, com.electrahub.proto.pricing.v1.ListPriceHistoryResponse> getListHistoryByPlanMethod;
    if ((getListHistoryByPlanMethod = PriceHistoryServiceGrpc.getListHistoryByPlanMethod) == null) {
      synchronized (PriceHistoryServiceGrpc.class) {
        if ((getListHistoryByPlanMethod = PriceHistoryServiceGrpc.getListHistoryByPlanMethod) == null) {
          PriceHistoryServiceGrpc.getListHistoryByPlanMethod = getListHistoryByPlanMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest, com.electrahub.proto.pricing.v1.ListPriceHistoryResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListHistoryByPlan"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListPriceHistoryResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PriceHistoryServiceMethodDescriptorSupplier("ListHistoryByPlan"))
              .build();
        }
      }
    }
    return getListHistoryByPlanMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest,
      com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse> getListHistoryByLocationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListHistoryByLocation",
      requestType = com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest.class,
      responseType = com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest,
      com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse> getListHistoryByLocationMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest, com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse> getListHistoryByLocationMethod;
    if ((getListHistoryByLocationMethod = PriceHistoryServiceGrpc.getListHistoryByLocationMethod) == null) {
      synchronized (PriceHistoryServiceGrpc.class) {
        if ((getListHistoryByLocationMethod = PriceHistoryServiceGrpc.getListHistoryByLocationMethod) == null) {
          PriceHistoryServiceGrpc.getListHistoryByLocationMethod = getListHistoryByLocationMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest, com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListHistoryByLocation"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PriceHistoryServiceMethodDescriptorSupplier("ListHistoryByLocation"))
              .build();
        }
      }
    }
    return getListHistoryByLocationMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static PriceHistoryServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PriceHistoryServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PriceHistoryServiceStub>() {
        @java.lang.Override
        public PriceHistoryServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PriceHistoryServiceStub(channel, callOptions);
        }
      };
    return PriceHistoryServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static PriceHistoryServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PriceHistoryServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PriceHistoryServiceBlockingStub>() {
        @java.lang.Override
        public PriceHistoryServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PriceHistoryServiceBlockingStub(channel, callOptions);
        }
      };
    return PriceHistoryServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static PriceHistoryServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PriceHistoryServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PriceHistoryServiceFutureStub>() {
        @java.lang.Override
        public PriceHistoryServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PriceHistoryServiceFutureStub(channel, callOptions);
        }
      };
    return PriceHistoryServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void listHistoryByPlan(com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPriceHistoryResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListHistoryByPlanMethod(), responseObserver);
    }

    /**
     */
    default void listHistoryByLocation(com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListHistoryByLocationMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service PriceHistoryService.
   */
  public static abstract class PriceHistoryServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return PriceHistoryServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service PriceHistoryService.
   */
  public static final class PriceHistoryServiceStub
      extends io.grpc.stub.AbstractAsyncStub<PriceHistoryServiceStub> {
    private PriceHistoryServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PriceHistoryServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PriceHistoryServiceStub(channel, callOptions);
    }

    /**
     */
    public void listHistoryByPlan(com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPriceHistoryResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListHistoryByPlanMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listHistoryByLocation(com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListHistoryByLocationMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service PriceHistoryService.
   */
  public static final class PriceHistoryServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<PriceHistoryServiceBlockingStub> {
    private PriceHistoryServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PriceHistoryServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PriceHistoryServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.ListPriceHistoryResponse listHistoryByPlan(com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListHistoryByPlanMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse listHistoryByLocation(com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListHistoryByLocationMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service PriceHistoryService.
   */
  public static final class PriceHistoryServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<PriceHistoryServiceFutureStub> {
    private PriceHistoryServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PriceHistoryServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PriceHistoryServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.ListPriceHistoryResponse> listHistoryByPlan(
        com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListHistoryByPlanMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse> listHistoryByLocation(
        com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListHistoryByLocationMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_LIST_HISTORY_BY_PLAN = 0;
  private static final int METHODID_LIST_HISTORY_BY_LOCATION = 1;

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
        case METHODID_LIST_HISTORY_BY_PLAN:
          serviceImpl.listHistoryByPlan((com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPriceHistoryResponse>) responseObserver);
          break;
        case METHODID_LIST_HISTORY_BY_LOCATION:
          serviceImpl.listHistoryByLocation((com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse>) responseObserver);
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
          getListHistoryByPlanMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.ListHistoryByPlanRequest,
              com.electrahub.proto.pricing.v1.ListPriceHistoryResponse>(
                service, METHODID_LIST_HISTORY_BY_PLAN)))
        .addMethod(
          getListHistoryByLocationMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.ListHistoryByLocationRequest,
              com.electrahub.proto.pricing.v1.PagedPriceHistoryResponse>(
                service, METHODID_LIST_HISTORY_BY_LOCATION)))
        .build();
  }

  private static abstract class PriceHistoryServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    PriceHistoryServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.pricing.v1.PricingProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("PriceHistoryService");
    }
  }

  private static final class PriceHistoryServiceFileDescriptorSupplier
      extends PriceHistoryServiceBaseDescriptorSupplier {
    PriceHistoryServiceFileDescriptorSupplier() {}
  }

  private static final class PriceHistoryServiceMethodDescriptorSupplier
      extends PriceHistoryServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    PriceHistoryServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (PriceHistoryServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new PriceHistoryServiceFileDescriptorSupplier())
              .addMethod(getListHistoryByPlanMethod())
              .addMethod(getListHistoryByLocationMethod())
              .build();
        }
      }
    }
    return result;
  }
}
