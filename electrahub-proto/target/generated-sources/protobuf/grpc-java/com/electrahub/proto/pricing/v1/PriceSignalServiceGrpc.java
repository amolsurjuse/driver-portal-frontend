package com.electrahub.proto.pricing.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/pricing/v1/pricing.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class PriceSignalServiceGrpc {

  private PriceSignalServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.pricing.v1.PriceSignalService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.CreatePriceSignalRequest,
      com.electrahub.proto.pricing.v1.PriceSignalResponse> getCreateSignalMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateSignal",
      requestType = com.electrahub.proto.pricing.v1.CreatePriceSignalRequest.class,
      responseType = com.electrahub.proto.pricing.v1.PriceSignalResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.CreatePriceSignalRequest,
      com.electrahub.proto.pricing.v1.PriceSignalResponse> getCreateSignalMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.CreatePriceSignalRequest, com.electrahub.proto.pricing.v1.PriceSignalResponse> getCreateSignalMethod;
    if ((getCreateSignalMethod = PriceSignalServiceGrpc.getCreateSignalMethod) == null) {
      synchronized (PriceSignalServiceGrpc.class) {
        if ((getCreateSignalMethod = PriceSignalServiceGrpc.getCreateSignalMethod) == null) {
          PriceSignalServiceGrpc.getCreateSignalMethod = getCreateSignalMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.CreatePriceSignalRequest, com.electrahub.proto.pricing.v1.PriceSignalResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateSignal"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.CreatePriceSignalRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.PriceSignalResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PriceSignalServiceMethodDescriptorSupplier("CreateSignal"))
              .build();
        }
      }
    }
    return getCreateSignalMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest,
      com.electrahub.proto.pricing.v1.ListPriceSignalsResponse> getListSignalsByLocationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListSignalsByLocation",
      requestType = com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest.class,
      responseType = com.electrahub.proto.pricing.v1.ListPriceSignalsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest,
      com.electrahub.proto.pricing.v1.ListPriceSignalsResponse> getListSignalsByLocationMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest, com.electrahub.proto.pricing.v1.ListPriceSignalsResponse> getListSignalsByLocationMethod;
    if ((getListSignalsByLocationMethod = PriceSignalServiceGrpc.getListSignalsByLocationMethod) == null) {
      synchronized (PriceSignalServiceGrpc.class) {
        if ((getListSignalsByLocationMethod = PriceSignalServiceGrpc.getListSignalsByLocationMethod) == null) {
          PriceSignalServiceGrpc.getListSignalsByLocationMethod = getListSignalsByLocationMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest, com.electrahub.proto.pricing.v1.ListPriceSignalsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListSignalsByLocation"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.ListPriceSignalsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PriceSignalServiceMethodDescriptorSupplier("ListSignalsByLocation"))
              .build();
        }
      }
    }
    return getListSignalsByLocationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.GetLatestSignalRequest,
      com.electrahub.proto.pricing.v1.PriceSignalResponse> getGetLatestSignalMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetLatestSignal",
      requestType = com.electrahub.proto.pricing.v1.GetLatestSignalRequest.class,
      responseType = com.electrahub.proto.pricing.v1.PriceSignalResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.GetLatestSignalRequest,
      com.electrahub.proto.pricing.v1.PriceSignalResponse> getGetLatestSignalMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.pricing.v1.GetLatestSignalRequest, com.electrahub.proto.pricing.v1.PriceSignalResponse> getGetLatestSignalMethod;
    if ((getGetLatestSignalMethod = PriceSignalServiceGrpc.getGetLatestSignalMethod) == null) {
      synchronized (PriceSignalServiceGrpc.class) {
        if ((getGetLatestSignalMethod = PriceSignalServiceGrpc.getGetLatestSignalMethod) == null) {
          PriceSignalServiceGrpc.getGetLatestSignalMethod = getGetLatestSignalMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.pricing.v1.GetLatestSignalRequest, com.electrahub.proto.pricing.v1.PriceSignalResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetLatestSignal"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.GetLatestSignalRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.pricing.v1.PriceSignalResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PriceSignalServiceMethodDescriptorSupplier("GetLatestSignal"))
              .build();
        }
      }
    }
    return getGetLatestSignalMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static PriceSignalServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PriceSignalServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PriceSignalServiceStub>() {
        @java.lang.Override
        public PriceSignalServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PriceSignalServiceStub(channel, callOptions);
        }
      };
    return PriceSignalServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static PriceSignalServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PriceSignalServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PriceSignalServiceBlockingStub>() {
        @java.lang.Override
        public PriceSignalServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PriceSignalServiceBlockingStub(channel, callOptions);
        }
      };
    return PriceSignalServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static PriceSignalServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PriceSignalServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PriceSignalServiceFutureStub>() {
        @java.lang.Override
        public PriceSignalServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PriceSignalServiceFutureStub(channel, callOptions);
        }
      };
    return PriceSignalServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void createSignal(com.electrahub.proto.pricing.v1.CreatePriceSignalRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PriceSignalResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateSignalMethod(), responseObserver);
    }

    /**
     */
    default void listSignalsByLocation(com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPriceSignalsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListSignalsByLocationMethod(), responseObserver);
    }

    /**
     */
    default void getLatestSignal(com.electrahub.proto.pricing.v1.GetLatestSignalRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PriceSignalResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetLatestSignalMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service PriceSignalService.
   */
  public static abstract class PriceSignalServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return PriceSignalServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service PriceSignalService.
   */
  public static final class PriceSignalServiceStub
      extends io.grpc.stub.AbstractAsyncStub<PriceSignalServiceStub> {
    private PriceSignalServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PriceSignalServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PriceSignalServiceStub(channel, callOptions);
    }

    /**
     */
    public void createSignal(com.electrahub.proto.pricing.v1.CreatePriceSignalRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PriceSignalResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateSignalMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listSignalsByLocation(com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPriceSignalsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListSignalsByLocationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getLatestSignal(com.electrahub.proto.pricing.v1.GetLatestSignalRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PriceSignalResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetLatestSignalMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service PriceSignalService.
   */
  public static final class PriceSignalServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<PriceSignalServiceBlockingStub> {
    private PriceSignalServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PriceSignalServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PriceSignalServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.PriceSignalResponse createSignal(com.electrahub.proto.pricing.v1.CreatePriceSignalRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateSignalMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.ListPriceSignalsResponse listSignalsByLocation(com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListSignalsByLocationMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.pricing.v1.PriceSignalResponse getLatestSignal(com.electrahub.proto.pricing.v1.GetLatestSignalRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetLatestSignalMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service PriceSignalService.
   */
  public static final class PriceSignalServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<PriceSignalServiceFutureStub> {
    private PriceSignalServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PriceSignalServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PriceSignalServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.PriceSignalResponse> createSignal(
        com.electrahub.proto.pricing.v1.CreatePriceSignalRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateSignalMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.ListPriceSignalsResponse> listSignalsByLocation(
        com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListSignalsByLocationMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.pricing.v1.PriceSignalResponse> getLatestSignal(
        com.electrahub.proto.pricing.v1.GetLatestSignalRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetLatestSignalMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CREATE_SIGNAL = 0;
  private static final int METHODID_LIST_SIGNALS_BY_LOCATION = 1;
  private static final int METHODID_GET_LATEST_SIGNAL = 2;

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
        case METHODID_CREATE_SIGNAL:
          serviceImpl.createSignal((com.electrahub.proto.pricing.v1.CreatePriceSignalRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PriceSignalResponse>) responseObserver);
          break;
        case METHODID_LIST_SIGNALS_BY_LOCATION:
          serviceImpl.listSignalsByLocation((com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.ListPriceSignalsResponse>) responseObserver);
          break;
        case METHODID_GET_LATEST_SIGNAL:
          serviceImpl.getLatestSignal((com.electrahub.proto.pricing.v1.GetLatestSignalRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.pricing.v1.PriceSignalResponse>) responseObserver);
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
          getCreateSignalMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.CreatePriceSignalRequest,
              com.electrahub.proto.pricing.v1.PriceSignalResponse>(
                service, METHODID_CREATE_SIGNAL)))
        .addMethod(
          getListSignalsByLocationMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.ListSignalsByLocationRequest,
              com.electrahub.proto.pricing.v1.ListPriceSignalsResponse>(
                service, METHODID_LIST_SIGNALS_BY_LOCATION)))
        .addMethod(
          getGetLatestSignalMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.pricing.v1.GetLatestSignalRequest,
              com.electrahub.proto.pricing.v1.PriceSignalResponse>(
                service, METHODID_GET_LATEST_SIGNAL)))
        .build();
  }

  private static abstract class PriceSignalServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    PriceSignalServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.pricing.v1.PricingProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("PriceSignalService");
    }
  }

  private static final class PriceSignalServiceFileDescriptorSupplier
      extends PriceSignalServiceBaseDescriptorSupplier {
    PriceSignalServiceFileDescriptorSupplier() {}
  }

  private static final class PriceSignalServiceMethodDescriptorSupplier
      extends PriceSignalServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    PriceSignalServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (PriceSignalServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new PriceSignalServiceFileDescriptorSupplier())
              .addMethod(getCreateSignalMethod())
              .addMethod(getListSignalsByLocationMethod())
              .addMethod(getGetLatestSignalMethod())
              .build();
        }
      }
    }
    return result;
  }
}
