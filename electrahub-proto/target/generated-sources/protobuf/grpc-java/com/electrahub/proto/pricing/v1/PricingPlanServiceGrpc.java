package com.electrahub.proto.pricing.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/pricing/v1/pricing.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class PricingPlanServiceGrpc {

  private PricingPlanServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.pricing.v1.PricingPlanService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.CreatePricingPlanRequest,
      com.electrahub.proto.pricing.v1.PricingPlanResponse> getCreatePlanMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreatePlan",
      requestType = com.electrahub.proto.pricing.v1.CreatePricingPlanRequest.class,
      responseType = com.electrahub.proto.pricing.v1.PricingPlanResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.CreatePricingPlanRequest,
      com.electrahub.proto.pricing.v1.PricingPlanResponse> getCreatePlanMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.CreatePricingPlanRequest, com.electrahub.proto.pricing.v1.PricingPlanResponse> getCreatePlanMethod;
    if ((getCreatePlanMethod = PricingPlanServiceGrpc.getCreatePlanMethod) == null) {
      synchronized (PricingPlanServiceGrpc.class) {
        if ((getCreatePlanMethod = PricingPlanServiceGrpc.getCreatePlanMethod) == null) {
          PricingPlanServiceGrpc.getCreatePlanMethod = getCreatePlanMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.CreatePricingPlanRequest, com.electrahub.proto.pricing.v1.PricingPlanResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreatePlan"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.CreatePricingPlanRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.PricingPlanResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingPlanServiceMethodDescriptorSupplier("CreatePlan"))
              .build();
        }
      }
    }
    return getCreatePlanMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.GetPricingPlanRequest,
      com.electrahub.proto.pricing.v1.PricingPlanResponse> getGetPlanMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetPlan",
      requestType = com.electrahub.proto.pricing.v1.GetPricingPlanRequest.class,
      responseType = com.electrahub.proto.pricing.v1.PricingPlanResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.GetPricingPlanRequest,
      com.electrahub.proto.pricing.v1.PricingPlanResponse> getGetPlanMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.GetPricingPlanRequest, com.electrahub.proto.pricing.v1.PricingPlanResponse> getGetPlanMethod;
    if ((getGetPlanMethod = PricingPlanServiceGrpc.getGetPlanMethod) == null) {
      synchronized (PricingPlanServiceGrpc.class) {
        if ((getGetPlanMethod = PricingPlanServiceGrpc.getGetPlanMethod) == null) {
          PricingPlanServiceGrpc.getGetPlanMethod = getGetPlanMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.GetPricingPlanRequest, com.electrahub.proto.pricing.v1.PricingPlanResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetPlan"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.GetPricingPlanRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.PricingPlanResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingPlanServiceMethodDescriptorSupplier("GetPlan"))
              .build();
        }
      }
    }
    return getGetPlanMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListPricingPlansRequest,
      com.electrahub.proto.pricing.v1.ListPricingPlansResponse> getListPlansMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListPlans",
      requestType = com.electrahub.proto.pricing.v1.ListPricingPlansRequest.class,
      responseType = com.electrahub.proto.pricing.v1.ListPricingPlansResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListPricingPlansRequest,
      com.electrahub.proto.pricing.v1.ListPricingPlansResponse> getListPlansMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListPricingPlansRequest, com.electrahub.proto.pricing.v1.ListPricingPlansResponse> getListPlansMethod;
    if ((getListPlansMethod = PricingPlanServiceGrpc.getListPlansMethod) == null) {
      synchronized (PricingPlanServiceGrpc.class) {
        if ((getListPlansMethod = PricingPlanServiceGrpc.getListPlansMethod) == null) {
          PricingPlanServiceGrpc.getListPlansMethod = getListPlansMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.ListPricingPlansRequest, com.electrahub.proto.pricing.v1.ListPricingPlansResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListPlans"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListPricingPlansRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListPricingPlansResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingPlanServiceMethodDescriptorSupplier("ListPlans"))
              .build();
        }
      }
    }
    return getListPlansMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest,
      com.electrahub.proto.pricing.v1.PagedPricingPlansResponse> getListPlansPagedMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListPlansPaged",
      requestType = com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest.class,
      responseType = com.electrahub.proto.pricing.v1.PagedPricingPlansResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest,
      com.electrahub.proto.pricing.v1.PagedPricingPlansResponse> getListPlansPagedMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest, com.electrahub.proto.pricing.v1.PagedPricingPlansResponse> getListPlansPagedMethod;
    if ((getListPlansPagedMethod = PricingPlanServiceGrpc.getListPlansPagedMethod) == null) {
      synchronized (PricingPlanServiceGrpc.class) {
        if ((getListPlansPagedMethod = PricingPlanServiceGrpc.getListPlansPagedMethod) == null) {
          PricingPlanServiceGrpc.getListPlansPagedMethod = getListPlansPagedMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest, com.electrahub.proto.pricing.v1.PagedPricingPlansResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListPlansPaged"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.PagedPricingPlansResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingPlanServiceMethodDescriptorSupplier("ListPlansPaged"))
              .build();
        }
      }
    }
    return getListPlansPagedMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListPlansByLocationRequest,
      com.electrahub.proto.pricing.v1.ListPricingPlansResponse> getListPlansByLocationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListPlansByLocation",
      requestType = com.electrahub.proto.pricing.v1.ListPlansByLocationRequest.class,
      responseType = com.electrahub.proto.pricing.v1.ListPricingPlansResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListPlansByLocationRequest,
      com.electrahub.proto.pricing.v1.ListPricingPlansResponse> getListPlansByLocationMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListPlansByLocationRequest, com.electrahub.proto.pricing.v1.ListPricingPlansResponse> getListPlansByLocationMethod;
    if ((getListPlansByLocationMethod = PricingPlanServiceGrpc.getListPlansByLocationMethod) == null) {
      synchronized (PricingPlanServiceGrpc.class) {
        if ((getListPlansByLocationMethod = PricingPlanServiceGrpc.getListPlansByLocationMethod) == null) {
          PricingPlanServiceGrpc.getListPlansByLocationMethod = getListPlansByLocationMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.ListPlansByLocationRequest, com.electrahub.proto.pricing.v1.ListPricingPlansResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListPlansByLocation"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListPlansByLocationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListPricingPlansResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingPlanServiceMethodDescriptorSupplier("ListPlansByLocation"))
              .build();
        }
      }
    }
    return getListPlansByLocationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.GetApplicablePlanRequest,
      com.electrahub.proto.pricing.v1.PricingPlanResponse> getGetApplicablePlanMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetApplicablePlan",
      requestType = com.electrahub.proto.pricing.v1.GetApplicablePlanRequest.class,
      responseType = com.electrahub.proto.pricing.v1.PricingPlanResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.GetApplicablePlanRequest,
      com.electrahub.proto.pricing.v1.PricingPlanResponse> getGetApplicablePlanMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.GetApplicablePlanRequest, com.electrahub.proto.pricing.v1.PricingPlanResponse> getGetApplicablePlanMethod;
    if ((getGetApplicablePlanMethod = PricingPlanServiceGrpc.getGetApplicablePlanMethod) == null) {
      synchronized (PricingPlanServiceGrpc.class) {
        if ((getGetApplicablePlanMethod = PricingPlanServiceGrpc.getGetApplicablePlanMethod) == null) {
          PricingPlanServiceGrpc.getGetApplicablePlanMethod = getGetApplicablePlanMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.GetApplicablePlanRequest, com.electrahub.proto.pricing.v1.PricingPlanResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetApplicablePlan"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.GetApplicablePlanRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.PricingPlanResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingPlanServiceMethodDescriptorSupplier("GetApplicablePlan"))
              .build();
        }
      }
    }
    return getGetApplicablePlanMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest,
      com.electrahub.proto.pricing.v1.PricingPlanResponse> getUpdatePlanMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "UpdatePlan",
      requestType = com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest.class,
      responseType = com.electrahub.proto.pricing.v1.PricingPlanResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest,
      com.electrahub.proto.pricing.v1.PricingPlanResponse> getUpdatePlanMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest, com.electrahub.proto.pricing.v1.PricingPlanResponse> getUpdatePlanMethod;
    if ((getUpdatePlanMethod = PricingPlanServiceGrpc.getUpdatePlanMethod) == null) {
      synchronized (PricingPlanServiceGrpc.class) {
        if ((getUpdatePlanMethod = PricingPlanServiceGrpc.getUpdatePlanMethod) == null) {
          PricingPlanServiceGrpc.getUpdatePlanMethod = getUpdatePlanMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest, com.electrahub.proto.pricing.v1.PricingPlanResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "UpdatePlan"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.PricingPlanResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingPlanServiceMethodDescriptorSupplier("UpdatePlan"))
              .build();
        }
      }
    }
    return getUpdatePlanMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.DeletePricingPlanRequest,
      com.electrahub.proto.pricing.v1.DeletePricingPlanResponse> getDeletePlanMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "DeletePlan",
      requestType = com.electrahub.proto.pricing.v1.DeletePricingPlanRequest.class,
      responseType = com.electrahub.proto.pricing.v1.DeletePricingPlanResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.DeletePricingPlanRequest,
      com.electrahub.proto.pricing.v1.DeletePricingPlanResponse> getDeletePlanMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.DeletePricingPlanRequest, com.electrahub.proto.pricing.v1.DeletePricingPlanResponse> getDeletePlanMethod;
    if ((getDeletePlanMethod = PricingPlanServiceGrpc.getDeletePlanMethod) == null) {
      synchronized (PricingPlanServiceGrpc.class) {
        if ((getDeletePlanMethod = PricingPlanServiceGrpc.getDeletePlanMethod) == null) {
          PricingPlanServiceGrpc.getDeletePlanMethod = getDeletePlanMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.DeletePricingPlanRequest, com.electrahub.proto.pricing.v1.DeletePricingPlanResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "DeletePlan"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.DeletePricingPlanRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.DeletePricingPlanResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PricingPlanServiceMethodDescriptorSupplier("DeletePlan"))
              .build();
        }
      }
    }
    return getDeletePlanMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static PricingPlanServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PricingPlanServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PricingPlanServiceStub>() {
        @java.lang.Override
        public PricingPlanServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PricingPlanServiceStub(channel, callOptions);
        }
      };
    return PricingPlanServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static PricingPlanServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PricingPlanServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PricingPlanServiceBlockingStub>() {
        @java.lang.Override
        public PricingPlanServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PricingPlanServiceBlockingStub(channel, callOptions);
        }
      };
    return PricingPlanServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static PricingPlanServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PricingPlanServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PricingPlanServiceFutureStub>() {
        @java.lang.Override
        public PricingPlanServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PricingPlanServiceFutureStub(channel, callOptions);
        }
      };
    return PricingPlanServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void createPlan(com.electrahub.proto.pricing.v1.CreatePricingPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreatePlanMethod(), responseObserver);
    }

    /**
     */
    default void getPlan(com.electrahub.proto.pricing.v1.GetPricingPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetPlanMethod(), responseObserver);
    }

    /**
     */
    default void listPlans(com.electrahub.proto.pricing.v1.ListPricingPlansRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPricingPlansResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListPlansMethod(), responseObserver);
    }

    /**
     */
    default void listPlansPaged(com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PagedPricingPlansResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListPlansPagedMethod(), responseObserver);
    }

    /**
     */
    default void listPlansByLocation(com.electrahub.proto.pricing.v1.ListPlansByLocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPricingPlansResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListPlansByLocationMethod(), responseObserver);
    }

    /**
     */
    default void getApplicablePlan(com.electrahub.proto.pricing.v1.GetApplicablePlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetApplicablePlanMethod(), responseObserver);
    }

    /**
     */
    default void updatePlan(com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getUpdatePlanMethod(), responseObserver);
    }

    /**
     */
    default void deletePlan(com.electrahub.proto.pricing.v1.DeletePricingPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.DeletePricingPlanResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getDeletePlanMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service PricingPlanService.
   */
  public static abstract class PricingPlanServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return PricingPlanServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service PricingPlanService.
   */
  public static final class PricingPlanServiceStub
      extends io.grpc.stub.AbstractAsyncStub<PricingPlanServiceStub> {
    private PricingPlanServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PricingPlanServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PricingPlanServiceStub(channel, callOptions);
    }

    /**
     */
    public void createPlan(com.electrahub.proto.pricing.v1.CreatePricingPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreatePlanMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getPlan(com.electrahub.proto.pricing.v1.GetPricingPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetPlanMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listPlans(com.electrahub.proto.pricing.v1.ListPricingPlansRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPricingPlansResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListPlansMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listPlansPaged(com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PagedPricingPlansResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListPlansPagedMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listPlansByLocation(com.electrahub.proto.pricing.v1.ListPlansByLocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPricingPlansResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListPlansByLocationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getApplicablePlan(com.electrahub.proto.pricing.v1.GetApplicablePlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetApplicablePlanMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void updatePlan(com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getUpdatePlanMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void deletePlan(com.electrahub.proto.pricing.v1.DeletePricingPlanRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.DeletePricingPlanResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getDeletePlanMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service PricingPlanService.
   */
  public static final class PricingPlanServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<PricingPlanServiceBlockingStub> {
    private PricingPlanServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PricingPlanServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PricingPlanServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.PricingPlanResponse createPlan(com.electrahub.proto.pricing.v1.CreatePricingPlanRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreatePlanMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.PricingPlanResponse getPlan(com.electrahub.proto.pricing.v1.GetPricingPlanRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetPlanMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.ListPricingPlansResponse listPlans(com.electrahub.proto.pricing.v1.ListPricingPlansRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListPlansMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.PagedPricingPlansResponse listPlansPaged(com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListPlansPagedMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.ListPricingPlansResponse listPlansByLocation(com.electrahub.proto.pricing.v1.ListPlansByLocationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListPlansByLocationMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.PricingPlanResponse getApplicablePlan(com.electrahub.proto.pricing.v1.GetApplicablePlanRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetApplicablePlanMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.PricingPlanResponse updatePlan(com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getUpdatePlanMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.DeletePricingPlanResponse deletePlan(com.electrahub.proto.pricing.v1.DeletePricingPlanRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getDeletePlanMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service PricingPlanService.
   */
  public static final class PricingPlanServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<PricingPlanServiceFutureStub> {
    private PricingPlanServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PricingPlanServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PricingPlanServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.PricingPlanResponse> createPlan(
        com.electrahub.proto.pricing.v1.CreatePricingPlanRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreatePlanMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.PricingPlanResponse> getPlan(
        com.electrahub.proto.pricing.v1.GetPricingPlanRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetPlanMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.ListPricingPlansResponse> listPlans(
        com.electrahub.proto.pricing.v1.ListPricingPlansRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListPlansMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.PagedPricingPlansResponse> listPlansPaged(
        com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListPlansPagedMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.ListPricingPlansResponse> listPlansByLocation(
        com.electrahub.proto.pricing.v1.ListPlansByLocationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListPlansByLocationMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.PricingPlanResponse> getApplicablePlan(
        com.electrahub.proto.pricing.v1.GetApplicablePlanRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetApplicablePlanMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.PricingPlanResponse> updatePlan(
        com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getUpdatePlanMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.DeletePricingPlanResponse> deletePlan(
        com.electrahub.proto.pricing.v1.DeletePricingPlanRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getDeletePlanMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CREATE_PLAN = 0;
  private static final int METHODID_GET_PLAN = 1;
  private static final int METHODID_LIST_PLANS = 2;
  private static final int METHODID_LIST_PLANS_PAGED = 3;
  private static final int METHODID_LIST_PLANS_BY_LOCATION = 4;
  private static final int METHODID_GET_APPLICABLE_PLAN = 5;
  private static final int METHODID_UPDATE_PLAN = 6;
  private static final int METHODID_DELETE_PLAN = 7;

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
          serviceImpl.createPlan((com.electrahub.proto.pricing.v1.CreatePricingPlanRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse>) responseObserver);
          break;
        case METHODID_GET_PLAN:
          serviceImpl.getPlan((com.electrahub.proto.pricing.v1.GetPricingPlanRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse>) responseObserver);
          break;
        case METHODID_LIST_PLANS:
          serviceImpl.listPlans((com.electrahub.proto.pricing.v1.ListPricingPlansRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPricingPlansResponse>) responseObserver);
          break;
        case METHODID_LIST_PLANS_PAGED:
          serviceImpl.listPlansPaged((com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PagedPricingPlansResponse>) responseObserver);
          break;
        case METHODID_LIST_PLANS_BY_LOCATION:
          serviceImpl.listPlansByLocation((com.electrahub.proto.pricing.v1.ListPlansByLocationRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPricingPlansResponse>) responseObserver);
          break;
        case METHODID_GET_APPLICABLE_PLAN:
          serviceImpl.getApplicablePlan((com.electrahub.proto.pricing.v1.GetApplicablePlanRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse>) responseObserver);
          break;
        case METHODID_UPDATE_PLAN:
          serviceImpl.updatePlan((com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PricingPlanResponse>) responseObserver);
          break;
        case METHODID_DELETE_PLAN:
          serviceImpl.deletePlan((com.electrahub.proto.pricing.v1.DeletePricingPlanRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.DeletePricingPlanResponse>) responseObserver);
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
              com.electrahub.proto.pricing.v1.CreatePricingPlanRequest,
              com.electrahub.proto.pricing.v1.PricingPlanResponse>(
                service, METHODID_CREATE_PLAN)))
        .addMethod(
          getGetPlanMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.GetPricingPlanRequest,
              com.electrahub.proto.pricing.v1.PricingPlanResponse>(
                service, METHODID_GET_PLAN)))
        .addMethod(
          getListPlansMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.ListPricingPlansRequest,
              com.electrahub.proto.pricing.v1.ListPricingPlansResponse>(
                service, METHODID_LIST_PLANS)))
        .addMethod(
          getListPlansPagedMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.ListPricingPlansPagedRequest,
              com.electrahub.proto.pricing.v1.PagedPricingPlansResponse>(
                service, METHODID_LIST_PLANS_PAGED)))
        .addMethod(
          getListPlansByLocationMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.ListPlansByLocationRequest,
              com.electrahub.proto.pricing.v1.ListPricingPlansResponse>(
                service, METHODID_LIST_PLANS_BY_LOCATION)))
        .addMethod(
          getGetApplicablePlanMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.GetApplicablePlanRequest,
              com.electrahub.proto.pricing.v1.PricingPlanResponse>(
                service, METHODID_GET_APPLICABLE_PLAN)))
        .addMethod(
          getUpdatePlanMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.UpdatePricingPlanRequest,
              com.electrahub.proto.pricing.v1.PricingPlanResponse>(
                service, METHODID_UPDATE_PLAN)))
        .addMethod(
          getDeletePlanMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.DeletePricingPlanRequest,
              com.electrahub.proto.pricing.v1.DeletePricingPlanResponse>(
                service, METHODID_DELETE_PLAN)))
        .build();
  }

  private static abstract class PricingPlanServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    PricingPlanServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.pricing.v1.PricingProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("PricingPlanService");
    }
  }

  private static final class PricingPlanServiceFileDescriptorSupplier
      extends PricingPlanServiceBaseDescriptorSupplier {
    PricingPlanServiceFileDescriptorSupplier() {}
  }

  private static final class PricingPlanServiceMethodDescriptorSupplier
      extends PricingPlanServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    PricingPlanServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (PricingPlanServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new PricingPlanServiceFileDescriptorSupplier())
              .addMethod(getCreatePlanMethod())
              .addMethod(getGetPlanMethod())
              .addMethod(getListPlansMethod())
              .addMethod(getListPlansPagedMethod())
              .addMethod(getListPlansByLocationMethod())
              .addMethod(getGetApplicablePlanMethod())
              .addMethod(getUpdatePlanMethod())
              .addMethod(getDeletePlanMethod())
              .build();
        }
      }
    }
    return result;
  }
}
