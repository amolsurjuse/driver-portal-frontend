package com.electrahub.proto.subscription.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/subscription/v1/subscription.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class SubscriptionUtilizationServiceGrpc {

  private SubscriptionUtilizationServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.subscription.v1.SubscriptionUtilizationService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.PreviewUtilizationRequest,
      com.electrahub.proto.subscription.v1.UtilizationPreviewResponse> getPreviewUtilizationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "PreviewUtilization",
      requestType = com.electrahub.proto.subscription.v1.PreviewUtilizationRequest.class,
      responseType = com.electrahub.proto.subscription.v1.UtilizationPreviewResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.PreviewUtilizationRequest,
      com.electrahub.proto.subscription.v1.UtilizationPreviewResponse> getPreviewUtilizationMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.PreviewUtilizationRequest, com.electrahub.proto.subscription.v1.UtilizationPreviewResponse> getPreviewUtilizationMethod;
    if ((getPreviewUtilizationMethod = SubscriptionUtilizationServiceGrpc.getPreviewUtilizationMethod) == null) {
      synchronized (SubscriptionUtilizationServiceGrpc.class) {
        if ((getPreviewUtilizationMethod = SubscriptionUtilizationServiceGrpc.getPreviewUtilizationMethod) == null) {
          SubscriptionUtilizationServiceGrpc.getPreviewUtilizationMethod = getPreviewUtilizationMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.PreviewUtilizationRequest, com.electrahub.proto.subscription.v1.UtilizationPreviewResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "PreviewUtilization"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.PreviewUtilizationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.UtilizationPreviewResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionUtilizationServiceMethodDescriptorSupplier("PreviewUtilization"))
              .build();
        }
      }
    }
    return getPreviewUtilizationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.RecordUtilizationRequest,
      com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse> getRecordUtilizationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RecordUtilization",
      requestType = com.electrahub.proto.subscription.v1.RecordUtilizationRequest.class,
      responseType = com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.RecordUtilizationRequest,
      com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse> getRecordUtilizationMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.RecordUtilizationRequest, com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse> getRecordUtilizationMethod;
    if ((getRecordUtilizationMethod = SubscriptionUtilizationServiceGrpc.getRecordUtilizationMethod) == null) {
      synchronized (SubscriptionUtilizationServiceGrpc.class) {
        if ((getRecordUtilizationMethod = SubscriptionUtilizationServiceGrpc.getRecordUtilizationMethod) == null) {
          SubscriptionUtilizationServiceGrpc.getRecordUtilizationMethod = getRecordUtilizationMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.RecordUtilizationRequest, com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RecordUtilization"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.RecordUtilizationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionUtilizationServiceMethodDescriptorSupplier("RecordUtilization"))
              .build();
        }
      }
    }
    return getRecordUtilizationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListUtilizationsRequest,
      com.electrahub.proto.subscription.v1.ListUtilizationsResponse> getListUtilizationsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListUtilizations",
      requestType = com.electrahub.proto.subscription.v1.ListUtilizationsRequest.class,
      responseType = com.electrahub.proto.subscription.v1.ListUtilizationsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListUtilizationsRequest,
      com.electrahub.proto.subscription.v1.ListUtilizationsResponse> getListUtilizationsMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.subscription.v1.ListUtilizationsRequest, com.electrahub.proto.subscription.v1.ListUtilizationsResponse> getListUtilizationsMethod;
    if ((getListUtilizationsMethod = SubscriptionUtilizationServiceGrpc.getListUtilizationsMethod) == null) {
      synchronized (SubscriptionUtilizationServiceGrpc.class) {
        if ((getListUtilizationsMethod = SubscriptionUtilizationServiceGrpc.getListUtilizationsMethod) == null) {
          SubscriptionUtilizationServiceGrpc.getListUtilizationsMethod = getListUtilizationsMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.subscription.v1.ListUtilizationsRequest, com.electrahub.proto.subscription.v1.ListUtilizationsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListUtilizations"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.ListUtilizationsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.subscription.v1.ListUtilizationsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new SubscriptionUtilizationServiceMethodDescriptorSupplier("ListUtilizations"))
              .build();
        }
      }
    }
    return getListUtilizationsMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static SubscriptionUtilizationServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionUtilizationServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionUtilizationServiceStub>() {
        @java.lang.Override
        public SubscriptionUtilizationServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionUtilizationServiceStub(channel, callOptions);
        }
      };
    return SubscriptionUtilizationServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static SubscriptionUtilizationServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionUtilizationServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionUtilizationServiceBlockingStub>() {
        @java.lang.Override
        public SubscriptionUtilizationServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionUtilizationServiceBlockingStub(channel, callOptions);
        }
      };
    return SubscriptionUtilizationServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static SubscriptionUtilizationServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<SubscriptionUtilizationServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<SubscriptionUtilizationServiceFutureStub>() {
        @java.lang.Override
        public SubscriptionUtilizationServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new SubscriptionUtilizationServiceFutureStub(channel, callOptions);
        }
      };
    return SubscriptionUtilizationServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void previewUtilization(com.electrahub.proto.subscription.v1.PreviewUtilizationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.UtilizationPreviewResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getPreviewUtilizationMethod(), responseObserver);
    }

    /**
     */
    default void recordUtilization(com.electrahub.proto.subscription.v1.RecordUtilizationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getRecordUtilizationMethod(), responseObserver);
    }

    /**
     */
    default void listUtilizations(com.electrahub.proto.subscription.v1.ListUtilizationsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.ListUtilizationsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListUtilizationsMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service SubscriptionUtilizationService.
   */
  public static abstract class SubscriptionUtilizationServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return SubscriptionUtilizationServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service SubscriptionUtilizationService.
   */
  public static final class SubscriptionUtilizationServiceStub
      extends io.grpc.stub.AbstractAsyncStub<SubscriptionUtilizationServiceStub> {
    private SubscriptionUtilizationServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionUtilizationServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionUtilizationServiceStub(channel, callOptions);
    }

    /**
     */
    public void previewUtilization(com.electrahub.proto.subscription.v1.PreviewUtilizationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.UtilizationPreviewResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getPreviewUtilizationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void recordUtilization(com.electrahub.proto.subscription.v1.RecordUtilizationRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getRecordUtilizationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listUtilizations(com.electrahub.proto.subscription.v1.ListUtilizationsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.ListUtilizationsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListUtilizationsMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service SubscriptionUtilizationService.
   */
  public static final class SubscriptionUtilizationServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<SubscriptionUtilizationServiceBlockingStub> {
    private SubscriptionUtilizationServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionUtilizationServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionUtilizationServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.UtilizationPreviewResponse previewUtilization(com.electrahub.proto.subscription.v1.PreviewUtilizationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getPreviewUtilizationMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse recordUtilization(com.electrahub.proto.subscription.v1.RecordUtilizationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getRecordUtilizationMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.electrahub.proto.subscription.v1.ListUtilizationsResponse listUtilizations(com.electrahub.proto.subscription.v1.ListUtilizationsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListUtilizationsMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service SubscriptionUtilizationService.
   */
  public static final class SubscriptionUtilizationServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<SubscriptionUtilizationServiceFutureStub> {
    private SubscriptionUtilizationServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected SubscriptionUtilizationServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new SubscriptionUtilizationServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.UtilizationPreviewResponse> previewUtilization(
        com.electrahub.proto.subscription.v1.PreviewUtilizationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getPreviewUtilizationMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse> recordUtilization(
        com.electrahub.proto.subscription.v1.RecordUtilizationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getRecordUtilizationMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.subscription.v1.ListUtilizationsResponse> listUtilizations(
        com.electrahub.proto.subscription.v1.ListUtilizationsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListUtilizationsMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_PREVIEW_UTILIZATION = 0;
  private static final int METHODID_RECORD_UTILIZATION = 1;
  private static final int METHODID_LIST_UTILIZATIONS = 2;

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
        case METHODID_PREVIEW_UTILIZATION:
          serviceImpl.previewUtilization((com.electrahub.proto.subscription.v1.PreviewUtilizationRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.UtilizationPreviewResponse>) responseObserver);
          break;
        case METHODID_RECORD_UTILIZATION:
          serviceImpl.recordUtilization((com.electrahub.proto.subscription.v1.RecordUtilizationRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse>) responseObserver);
          break;
        case METHODID_LIST_UTILIZATIONS:
          serviceImpl.listUtilizations((com.electrahub.proto.subscription.v1.ListUtilizationsRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.subscription.v1.ListUtilizationsResponse>) responseObserver);
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
          getPreviewUtilizationMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.PreviewUtilizationRequest,
              com.electrahub.proto.subscription.v1.UtilizationPreviewResponse>(
                service, METHODID_PREVIEW_UTILIZATION)))
        .addMethod(
          getRecordUtilizationMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.RecordUtilizationRequest,
              com.electrahub.proto.subscription.v1.SubscriptionUtilizationResponse>(
                service, METHODID_RECORD_UTILIZATION)))
        .addMethod(
          getListUtilizationsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.subscription.v1.ListUtilizationsRequest,
              com.electrahub.proto.subscription.v1.ListUtilizationsResponse>(
                service, METHODID_LIST_UTILIZATIONS)))
        .build();
  }

  private static abstract class SubscriptionUtilizationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    SubscriptionUtilizationServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.subscription.v1.SubscriptionProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("SubscriptionUtilizationService");
    }
  }

  private static final class SubscriptionUtilizationServiceFileDescriptorSupplier
      extends SubscriptionUtilizationServiceBaseDescriptorSupplier {
    SubscriptionUtilizationServiceFileDescriptorSupplier() {}
  }

  private static final class SubscriptionUtilizationServiceMethodDescriptorSupplier
      extends SubscriptionUtilizationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    SubscriptionUtilizationServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (SubscriptionUtilizationServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new SubscriptionUtilizationServiceFileDescriptorSupplier())
              .addMethod(getPreviewUtilizationMethod())
              .addMethod(getRecordUtilizationMethod())
              .addMethod(getListUtilizationsMethod())
              .build();
        }
      }
    }
    return result;
  }
}
