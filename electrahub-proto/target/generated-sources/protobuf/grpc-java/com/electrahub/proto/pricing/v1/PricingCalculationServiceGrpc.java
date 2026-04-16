package com.electrahub.proto.pricing.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/pricing/v1/pricing.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class PricingCalculationServiceGrpc {

  private PricingCalculationServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.pricing.v1.PricingCalculationService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.SessionCostRequest,
      com.electrahub.proto.pricing.v1.CostBreakdownResponse> getCalculateSessionCostMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CalculateSessionCost",
      requestType = com.electrahub.proto.pricing.v1.SessionCostRequest.class,
      responseType = com.electrahub.proto.pricing.v1.CostBreakdownResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.SessionCostRequest,
      com.electrahub.proto.pricing.v1.CostBreakdownResponse> getCalculateSessionCostMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.SessionCostRequest, com.electrahub.proto.pricing.v1.CostBreakdownResponse> getCalculateSessionCostMethod;
    if ((getCalculateSessionCostMethod = PricingCalculationServiceGrpc.getCalculateSessionCostMethod) == null) {
      synchronized (PricingCalculationServiceGrpc.class) {
        if ((getCalculateSessionCostMethod = PricingCalculationServiceGrpc.getCalculateSessionCostMethod) == null) {
          PricingCalculationServiceGrpc.getCalculateSessionCostMethod = getCalculateSessionCostMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.SessionCostRequest, com.electrahub.proto.pricing.v1.CostBreakdownResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CalculateSessionCost"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.SessionCostRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.CostBreakdownResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingCalculationServiceMethodDescriptorSupplier("CalculateSessionCost"))
              .build();
        }
      }
    }
    return getCalculateSessionCostMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.EstimateCostRequest,
      com.electrahub.proto.pricing.v1.CostEstimateResponse> getEstimateCostMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "EstimateCost",
      requestType = com.electrahub.proto.pricing.v1.EstimateCostRequest.class,
      responseType = com.electrahub.proto.pricing.v1.CostEstimateResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.EstimateCostRequest,
      com.electrahub.proto.pricing.v1.CostEstimateResponse> getEstimateCostMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.EstimateCostRequest, com.electrahub.proto.pricing.v1.CostEstimateResponse> getEstimateCostMethod;
    if ((getEstimateCostMethod = PricingCalculationServiceGrpc.getEstimateCostMethod) == null) {
      synchronized (PricingCalculationServiceGrpc.class) {
        if ((getEstimateCostMethod = PricingCalculationServiceGrpc.getEstimateCostMethod) == null) {
          PricingCalculationServiceGrpc.getEstimateCostMethod = getEstimateCostMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.EstimateCostRequest, com.electrahub.proto.pricing.v1.CostEstimateResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "EstimateCost"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.EstimateCostRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.CostEstimateResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingCalculationServiceMethodDescriptorSupplier("EstimateCost"))
              .build();
        }
      }
    }
    return getEstimateCostMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.RealtimeCostRequest,
      com.electrahub.proto.pricing.v1.RealtimeCostResponse> getCalculateRealtimeCostMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CalculateRealtimeCost",
      requestType = com.electrahub.proto.pricing.v1.RealtimeCostRequest.class,
      responseType = com.electrahub.proto.pricing.v1.RealtimeCostResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.RealtimeCostRequest,
      com.electrahub.proto.pricing.v1.RealtimeCostResponse> getCalculateRealtimeCostMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.RealtimeCostRequest, com.electrahub.proto.pricing.v1.RealtimeCostResponse> getCalculateRealtimeCostMethod;
    if ((getCalculateRealtimeCostMethod = PricingCalculationServiceGrpc.getCalculateRealtimeCostMethod) == null) {
      synchronized (PricingCalculationServiceGrpc.class) {
        if ((getCalculateRealtimeCostMethod = PricingCalculationServiceGrpc.getCalculateRealtimeCostMethod) == null) {
          PricingCalculationServiceGrpc.getCalculateRealtimeCostMethod = getCalculateRealtimeCostMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.RealtimeCostRequest, com.electrahub.proto.pricing.v1.RealtimeCostResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CalculateRealtimeCost"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.RealtimeCostRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.RealtimeCostResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingCalculationServiceMethodDescriptorSupplier("CalculateRealtimeCost"))
              .build();
        }
      }
    }
    return getCalculateRealtimeCostMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static PricingCalculationServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PricingCalculationServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PricingCalculationServiceStub>() {
        @java.lang.Override
        public PricingCalculationServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PricingCalculationServiceStub(channel, callOptions);
        }
      };
    return PricingCalculationServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static PricingCalculationServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PricingCalculationServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PricingCalculationServiceBlockingStub>() {
        @java.lang.Override
        public PricingCalculationServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PricingCalculationServiceBlockingStub(channel, callOptions);
        }
      };
    return PricingCalculationServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static PricingCalculationServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PricingCalculationServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PricingCalculationServiceFutureStub>() {
        @java.lang.Override
        public PricingCalculationServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PricingCalculationServiceFutureStub(channel, callOptions);
        }
      };
    return PricingCalculationServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void calculateSessionCost(com.electrahub.proto.pricing.v1.SessionCostRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.CostBreakdownResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCalculateSessionCostMethod(), responseObserver);
    }

    /**
     */
    default void estimateCost(com.electrahub.proto.pricing.v1.EstimateCostRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.CostEstimateResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getEstimateCostMethod(), responseObserver);
    }

    /**
     */
    default void calculateRealtimeCost(com.electrahub.proto.pricing.v1.RealtimeCostRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.RealtimeCostResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCalculateRealtimeCostMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service PricingCalculationService.
   */
  public static abstract class PricingCalculationServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return PricingCalculationServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service PricingCalculationService.
   */
  public static final class PricingCalculationServiceStub
      extends io.grpc.stub.AbstractAsyncStub<PricingCalculationServiceStub> {
    private PricingCalculationServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PricingCalculationServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PricingCalculationServiceStub(channel, callOptions);
    }

    /**
     */
    public void calculateSessionCost(com.electrahub.proto.pricing.v1.SessionCostRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.CostBreakdownResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCalculateSessionCostMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void estimateCost(com.electrahub.proto.pricing.v1.EstimateCostRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.CostEstimateResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getEstimateCostMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void calculateRealtimeCost(com.electrahub.proto.pricing.v1.RealtimeCostRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.RealtimeCostResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCalculateRealtimeCostMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service PricingCalculationService.
   */
  public static final class PricingCalculationServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<PricingCalculationServiceBlockingStub> {
    private PricingCalculationServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PricingCalculationServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PricingCalculationServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.CostBreakdownResponse calculateSessionCost(com.electrahub.proto.pricing.v1.SessionCostRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCalculateSessionCostMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.CostEstimateResponse estimateCost(com.electrahub.proto.pricing.v1.EstimateCostRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getEstimateCostMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.RealtimeCostResponse calculateRealtimeCost(com.electrahub.proto.pricing.v1.RealtimeCostRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCalculateRealtimeCostMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service PricingCalculationService.
   */
  public static final class PricingCalculationServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<PricingCalculationServiceFutureStub> {
    private PricingCalculationServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PricingCalculationServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PricingCalculationServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.CostBreakdownResponse> calculateSessionCost(
        com.electrahub.proto.pricing.v1.SessionCostRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCalculateSessionCostMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.CostEstimateResponse> estimateCost(
        com.electrahub.proto.pricing.v1.EstimateCostRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getEstimateCostMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.RealtimeCostResponse> calculateRealtimeCost(
        com.electrahub.proto.pricing.v1.RealtimeCostRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCalculateRealtimeCostMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CALCULATE_SESSION_COST = 0;
  private static final int METHODID_ESTIMATE_COST = 1;
  private static final int METHODID_CALCULATE_REALTIME_COST = 2;

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
        case METHODID_CALCULATE_SESSION_COST:
          serviceImpl.calculateSessionCost((com.electrahub.proto.pricing.v1.SessionCostRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.CostBreakdownResponse>) responseObserver);
          break;
        case METHODID_ESTIMATE_COST:
          serviceImpl.estimateCost((com.electrahub.proto.pricing.v1.EstimateCostRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.CostEstimateResponse>) responseObserver);
          break;
        case METHODID_CALCULATE_REALTIME_COST:
          serviceImpl.calculateRealtimeCost((com.electrahub.proto.pricing.v1.RealtimeCostRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.RealtimeCostResponse>) responseObserver);
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
          getCalculateSessionCostMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.SessionCostRequest,
              com.electrahub.proto.pricing.v1.CostBreakdownResponse>(
                service, METHODID_CALCULATE_SESSION_COST)))
        .addMethod(
          getEstimateCostMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.EstimateCostRequest,
              com.electrahub.proto.pricing.v1.CostEstimateResponse>(
                service, METHODID_ESTIMATE_COST)))
        .addMethod(
          getCalculateRealtimeCostMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.RealtimeCostRequest,
              com.electrahub.proto.pricing.v1.RealtimeCostResponse>(
                service, METHODID_CALCULATE_REALTIME_COST)))
        .build();
  }

  private static abstract class PricingCalculationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    PricingCalculationServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.pricing.v1.PricingProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("PricingCalculationService");
    }
  }

  private static final class PricingCalculationServiceFileDescriptorSupplier
      extends PricingCalculationServiceBaseDescriptorSupplier {
    PricingCalculationServiceFileDescriptorSupplier() {}
  }

  private static final class PricingCalculationServiceMethodDescriptorSupplier
      extends PricingCalculationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    PricingCalculationServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (PricingCalculationServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new PricingCalculationServiceFileDescriptorSupplier())
              .addMethod(getCalculateSessionCostMethod())
              .addMethod(getEstimateCostMethod())
              .addMethod(getCalculateRealtimeCostMethod())
              .build();
        }
      }
    }
    return result;
  }
}
