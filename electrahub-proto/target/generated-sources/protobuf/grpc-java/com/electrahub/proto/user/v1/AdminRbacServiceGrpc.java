package com.electrahub.proto.user.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/user/v1/user.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class AdminRbacServiceGrpc {

  private AdminRbacServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.user.v1.AdminRbacService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetAdminPolicyRequest,
      com.electrahub.proto.user.v1.AdminRbacPolicyResponse> getGetAdminPolicyMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetAdminPolicy",
      requestType = com.electrahub.proto.user.v1.GetAdminPolicyRequest.class,
      responseType = com.electrahub.proto.user.v1.AdminRbacPolicyResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetAdminPolicyRequest,
      com.electrahub.proto.user.v1.AdminRbacPolicyResponse> getGetAdminPolicyMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetAdminPolicyRequest, com.electrahub.proto.user.v1.AdminRbacPolicyResponse> getGetAdminPolicyMethod;
    if ((getGetAdminPolicyMethod = AdminRbacServiceGrpc.getGetAdminPolicyMethod) == null) {
      synchronized (AdminRbacServiceGrpc.class) {
        if ((getGetAdminPolicyMethod = AdminRbacServiceGrpc.getGetAdminPolicyMethod) == null) {
          AdminRbacServiceGrpc.getGetAdminPolicyMethod = getGetAdminPolicyMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.GetAdminPolicyRequest, com.electrahub.proto.user.v1.AdminRbacPolicyResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetAdminPolicy"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.GetAdminPolicyRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminRbacPolicyResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AdminRbacServiceMethodDescriptorSupplier("GetAdminPolicy"))
              .build();
        }
      }
    }
    return getGetAdminPolicyMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.UpdateAdminPolicyRequest,
      com.electrahub.proto.user.v1.AdminRbacPolicyResponse> getUpdateAdminPolicyMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "UpdateAdminPolicy",
      requestType = com.electrahub.proto.user.v1.UpdateAdminPolicyRequest.class,
      responseType = com.electrahub.proto.user.v1.AdminRbacPolicyResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.UpdateAdminPolicyRequest,
      com.electrahub.proto.user.v1.AdminRbacPolicyResponse> getUpdateAdminPolicyMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.UpdateAdminPolicyRequest, com.electrahub.proto.user.v1.AdminRbacPolicyResponse> getUpdateAdminPolicyMethod;
    if ((getUpdateAdminPolicyMethod = AdminRbacServiceGrpc.getUpdateAdminPolicyMethod) == null) {
      synchronized (AdminRbacServiceGrpc.class) {
        if ((getUpdateAdminPolicyMethod = AdminRbacServiceGrpc.getUpdateAdminPolicyMethod) == null) {
          AdminRbacServiceGrpc.getUpdateAdminPolicyMethod = getUpdateAdminPolicyMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.UpdateAdminPolicyRequest, com.electrahub.proto.user.v1.AdminRbacPolicyResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "UpdateAdminPolicy"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.UpdateAdminPolicyRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminRbacPolicyResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AdminRbacServiceMethodDescriptorSupplier("UpdateAdminPolicy"))
              .build();
        }
      }
    }
    return getUpdateAdminPolicyMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static AdminRbacServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AdminRbacServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AdminRbacServiceStub>() {
        @java.lang.Override
        public AdminRbacServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AdminRbacServiceStub(channel, callOptions);
        }
      };
    return AdminRbacServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static AdminRbacServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AdminRbacServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AdminRbacServiceBlockingStub>() {
        @java.lang.Override
        public AdminRbacServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AdminRbacServiceBlockingStub(channel, callOptions);
        }
      };
    return AdminRbacServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static AdminRbacServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AdminRbacServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AdminRbacServiceFutureStub>() {
        @java.lang.Override
        public AdminRbacServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AdminRbacServiceFutureStub(channel, callOptions);
        }
      };
    return AdminRbacServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     * <pre>
     * Admin: get full RBAC policy with metadata
     * </pre>
     */
    default void getAdminPolicy(com.electrahub.proto.user.v1.GetAdminPolicyRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminRbacPolicyResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetAdminPolicyMethod(), responseObserver);
    }

    /**
     * <pre>
     * Admin: update RBAC policy
     * </pre>
     */
    default void updateAdminPolicy(com.electrahub.proto.user.v1.UpdateAdminPolicyRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminRbacPolicyResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getUpdateAdminPolicyMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service AdminRbacService.
   */
  public static abstract class AdminRbacServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return AdminRbacServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service AdminRbacService.
   */
  public static final class AdminRbacServiceStub
      extends io.grpc.stub.AbstractAsyncStub<AdminRbacServiceStub> {
    private AdminRbacServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AdminRbacServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AdminRbacServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     * Admin: get full RBAC policy with metadata
     * </pre>
     */
    public void getAdminPolicy(com.electrahub.proto.user.v1.GetAdminPolicyRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminRbacPolicyResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetAdminPolicyMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Admin: update RBAC policy
     * </pre>
     */
    public void updateAdminPolicy(com.electrahub.proto.user.v1.UpdateAdminPolicyRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminRbacPolicyResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getUpdateAdminPolicyMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service AdminRbacService.
   */
  public static final class AdminRbacServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<AdminRbacServiceBlockingStub> {
    private AdminRbacServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AdminRbacServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AdminRbacServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Admin: get full RBAC policy with metadata
     * </pre>
     */
    public com.electrahub.proto.user.v1.AdminRbacPolicyResponse getAdminPolicy(com.electrahub.proto.user.v1.GetAdminPolicyRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetAdminPolicyMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Admin: update RBAC policy
     * </pre>
     */
    public com.electrahub.proto.user.v1.AdminRbacPolicyResponse updateAdminPolicy(com.electrahub.proto.user.v1.UpdateAdminPolicyRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getUpdateAdminPolicyMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service AdminRbacService.
   */
  public static final class AdminRbacServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<AdminRbacServiceFutureStub> {
    private AdminRbacServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AdminRbacServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AdminRbacServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Admin: get full RBAC policy with metadata
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.AdminRbacPolicyResponse> getAdminPolicy(
        com.electrahub.proto.user.v1.GetAdminPolicyRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetAdminPolicyMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Admin: update RBAC policy
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.AdminRbacPolicyResponse> updateAdminPolicy(
        com.electrahub.proto.user.v1.UpdateAdminPolicyRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getUpdateAdminPolicyMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_GET_ADMIN_POLICY = 0;
  private static final int METHODID_UPDATE_ADMIN_POLICY = 1;

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
        case METHODID_GET_ADMIN_POLICY:
          serviceImpl.getAdminPolicy((com.electrahub.proto.user.v1.GetAdminPolicyRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminRbacPolicyResponse>) responseObserver);
          break;
        case METHODID_UPDATE_ADMIN_POLICY:
          serviceImpl.updateAdminPolicy((com.electrahub.proto.user.v1.UpdateAdminPolicyRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminRbacPolicyResponse>) responseObserver);
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
          getGetAdminPolicyMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.GetAdminPolicyRequest,
              com.electrahub.proto.user.v1.AdminRbacPolicyResponse>(
                service, METHODID_GET_ADMIN_POLICY)))
        .addMethod(
          getUpdateAdminPolicyMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.UpdateAdminPolicyRequest,
              com.electrahub.proto.user.v1.AdminRbacPolicyResponse>(
                service, METHODID_UPDATE_ADMIN_POLICY)))
        .build();
  }

  private static abstract class AdminRbacServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    AdminRbacServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.user.v1.UserProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("AdminRbacService");
    }
  }

  private static final class AdminRbacServiceFileDescriptorSupplier
      extends AdminRbacServiceBaseDescriptorSupplier {
    AdminRbacServiceFileDescriptorSupplier() {}
  }

  private static final class AdminRbacServiceMethodDescriptorSupplier
      extends AdminRbacServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    AdminRbacServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (AdminRbacServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new AdminRbacServiceFileDescriptorSupplier())
              .addMethod(getGetAdminPolicyMethod())
              .addMethod(getUpdateAdminPolicyMethod())
              .build();
        }
      }
    }
    return result;
  }
}
