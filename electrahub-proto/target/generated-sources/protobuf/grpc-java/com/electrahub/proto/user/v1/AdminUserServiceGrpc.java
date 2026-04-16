package com.electrahub.proto.user.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/user/v1/user.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class AdminUserServiceGrpc {

  private AdminUserServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.user.v1.AdminUserService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminSearchUsersRequest,
      com.electrahub.proto.user.v1.AdminUserSearchResponse> getAdminSearchUsersMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AdminSearchUsers",
      requestType = com.electrahub.proto.user.v1.AdminSearchUsersRequest.class,
      responseType = com.electrahub.proto.user.v1.AdminUserSearchResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminSearchUsersRequest,
      com.electrahub.proto.user.v1.AdminUserSearchResponse> getAdminSearchUsersMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminSearchUsersRequest, com.electrahub.proto.user.v1.AdminUserSearchResponse> getAdminSearchUsersMethod;
    if ((getAdminSearchUsersMethod = AdminUserServiceGrpc.getAdminSearchUsersMethod) == null) {
      synchronized (AdminUserServiceGrpc.class) {
        if ((getAdminSearchUsersMethod = AdminUserServiceGrpc.getAdminSearchUsersMethod) == null) {
          AdminUserServiceGrpc.getAdminSearchUsersMethod = getAdminSearchUsersMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.AdminSearchUsersRequest, com.electrahub.proto.user.v1.AdminUserSearchResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "AdminSearchUsers"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminSearchUsersRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminUserSearchResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AdminUserServiceMethodDescriptorSupplier("AdminSearchUsers"))
              .build();
        }
      }
    }
    return getAdminSearchUsersMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminGetUserDetailRequest,
      com.electrahub.proto.user.v1.AdminUserDetailResponse> getAdminGetUserDetailMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AdminGetUserDetail",
      requestType = com.electrahub.proto.user.v1.AdminGetUserDetailRequest.class,
      responseType = com.electrahub.proto.user.v1.AdminUserDetailResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminGetUserDetailRequest,
      com.electrahub.proto.user.v1.AdminUserDetailResponse> getAdminGetUserDetailMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminGetUserDetailRequest, com.electrahub.proto.user.v1.AdminUserDetailResponse> getAdminGetUserDetailMethod;
    if ((getAdminGetUserDetailMethod = AdminUserServiceGrpc.getAdminGetUserDetailMethod) == null) {
      synchronized (AdminUserServiceGrpc.class) {
        if ((getAdminGetUserDetailMethod = AdminUserServiceGrpc.getAdminGetUserDetailMethod) == null) {
          AdminUserServiceGrpc.getAdminGetUserDetailMethod = getAdminGetUserDetailMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.AdminGetUserDetailRequest, com.electrahub.proto.user.v1.AdminUserDetailResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "AdminGetUserDetail"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminGetUserDetailRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminUserDetailResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AdminUserServiceMethodDescriptorSupplier("AdminGetUserDetail"))
              .build();
        }
      }
    }
    return getAdminGetUserDetailMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminUpdateUserRequest,
      com.electrahub.proto.user.v1.AdminUserDetailResponse> getAdminUpdateUserMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AdminUpdateUser",
      requestType = com.electrahub.proto.user.v1.AdminUpdateUserRequest.class,
      responseType = com.electrahub.proto.user.v1.AdminUserDetailResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminUpdateUserRequest,
      com.electrahub.proto.user.v1.AdminUserDetailResponse> getAdminUpdateUserMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminUpdateUserRequest, com.electrahub.proto.user.v1.AdminUserDetailResponse> getAdminUpdateUserMethod;
    if ((getAdminUpdateUserMethod = AdminUserServiceGrpc.getAdminUpdateUserMethod) == null) {
      synchronized (AdminUserServiceGrpc.class) {
        if ((getAdminUpdateUserMethod = AdminUserServiceGrpc.getAdminUpdateUserMethod) == null) {
          AdminUserServiceGrpc.getAdminUpdateUserMethod = getAdminUpdateUserMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.AdminUpdateUserRequest, com.electrahub.proto.user.v1.AdminUserDetailResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "AdminUpdateUser"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminUpdateUserRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminUserDetailResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AdminUserServiceMethodDescriptorSupplier("AdminUpdateUser"))
              .build();
        }
      }
    }
    return getAdminUpdateUserMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminResetPasswordRequest,
      com.electrahub.proto.user.v1.AdminResetPasswordResponse> getAdminResetPasswordMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AdminResetPassword",
      requestType = com.electrahub.proto.user.v1.AdminResetPasswordRequest.class,
      responseType = com.electrahub.proto.user.v1.AdminResetPasswordResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminResetPasswordRequest,
      com.electrahub.proto.user.v1.AdminResetPasswordResponse> getAdminResetPasswordMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminResetPasswordRequest, com.electrahub.proto.user.v1.AdminResetPasswordResponse> getAdminResetPasswordMethod;
    if ((getAdminResetPasswordMethod = AdminUserServiceGrpc.getAdminResetPasswordMethod) == null) {
      synchronized (AdminUserServiceGrpc.class) {
        if ((getAdminResetPasswordMethod = AdminUserServiceGrpc.getAdminResetPasswordMethod) == null) {
          AdminUserServiceGrpc.getAdminResetPasswordMethod = getAdminResetPasswordMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.AdminResetPasswordRequest, com.electrahub.proto.user.v1.AdminResetPasswordResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "AdminResetPassword"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminResetPasswordRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminResetPasswordResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AdminUserServiceMethodDescriptorSupplier("AdminResetPassword"))
              .build();
        }
      }
    }
    return getAdminResetPasswordMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminDeleteUserRequest,
      com.electrahub.proto.user.v1.AdminDeleteUserResponse> getAdminDeleteUserMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AdminDeleteUser",
      requestType = com.electrahub.proto.user.v1.AdminDeleteUserRequest.class,
      responseType = com.electrahub.proto.user.v1.AdminDeleteUserResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminDeleteUserRequest,
      com.electrahub.proto.user.v1.AdminDeleteUserResponse> getAdminDeleteUserMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AdminDeleteUserRequest, com.electrahub.proto.user.v1.AdminDeleteUserResponse> getAdminDeleteUserMethod;
    if ((getAdminDeleteUserMethod = AdminUserServiceGrpc.getAdminDeleteUserMethod) == null) {
      synchronized (AdminUserServiceGrpc.class) {
        if ((getAdminDeleteUserMethod = AdminUserServiceGrpc.getAdminDeleteUserMethod) == null) {
          AdminUserServiceGrpc.getAdminDeleteUserMethod = getAdminDeleteUserMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.AdminDeleteUserRequest, com.electrahub.proto.user.v1.AdminDeleteUserResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "AdminDeleteUser"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminDeleteUserRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AdminDeleteUserResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AdminUserServiceMethodDescriptorSupplier("AdminDeleteUser"))
              .build();
        }
      }
    }
    return getAdminDeleteUserMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static AdminUserServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AdminUserServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AdminUserServiceStub>() {
        @java.lang.Override
        public AdminUserServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AdminUserServiceStub(channel, callOptions);
        }
      };
    return AdminUserServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static AdminUserServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AdminUserServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AdminUserServiceBlockingStub>() {
        @java.lang.Override
        public AdminUserServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AdminUserServiceBlockingStub(channel, callOptions);
        }
      };
    return AdminUserServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static AdminUserServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AdminUserServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AdminUserServiceFutureStub>() {
        @java.lang.Override
        public AdminUserServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AdminUserServiceFutureStub(channel, callOptions);
        }
      };
    return AdminUserServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     * <pre>
     * Admin: search users with extended details
     * </pre>
     */
    default void adminSearchUsers(com.electrahub.proto.user.v1.AdminSearchUsersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminUserSearchResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAdminSearchUsersMethod(), responseObserver);
    }

    /**
     * <pre>
     * Admin: get user detail
     * </pre>
     */
    default void adminGetUserDetail(com.electrahub.proto.user.v1.AdminGetUserDetailRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminUserDetailResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAdminGetUserDetailMethod(), responseObserver);
    }

    /**
     * <pre>
     * Admin: update user
     * </pre>
     */
    default void adminUpdateUser(com.electrahub.proto.user.v1.AdminUpdateUserRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminUserDetailResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAdminUpdateUserMethod(), responseObserver);
    }

    /**
     * <pre>
     * Admin: reset user password
     * </pre>
     */
    default void adminResetPassword(com.electrahub.proto.user.v1.AdminResetPasswordRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminResetPasswordResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAdminResetPasswordMethod(), responseObserver);
    }

    /**
     * <pre>
     * Admin: delete user
     * </pre>
     */
    default void adminDeleteUser(com.electrahub.proto.user.v1.AdminDeleteUserRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminDeleteUserResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAdminDeleteUserMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service AdminUserService.
   */
  public static abstract class AdminUserServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return AdminUserServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service AdminUserService.
   */
  public static final class AdminUserServiceStub
      extends io.grpc.stub.AbstractAsyncStub<AdminUserServiceStub> {
    private AdminUserServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AdminUserServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AdminUserServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     * Admin: search users with extended details
     * </pre>
     */
    public void adminSearchUsers(com.electrahub.proto.user.v1.AdminSearchUsersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminUserSearchResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAdminSearchUsersMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Admin: get user detail
     * </pre>
     */
    public void adminGetUserDetail(com.electrahub.proto.user.v1.AdminGetUserDetailRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminUserDetailResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAdminGetUserDetailMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Admin: update user
     * </pre>
     */
    public void adminUpdateUser(com.electrahub.proto.user.v1.AdminUpdateUserRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminUserDetailResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAdminUpdateUserMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Admin: reset user password
     * </pre>
     */
    public void adminResetPassword(com.electrahub.proto.user.v1.AdminResetPasswordRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminResetPasswordResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAdminResetPasswordMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Admin: delete user
     * </pre>
     */
    public void adminDeleteUser(com.electrahub.proto.user.v1.AdminDeleteUserRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminDeleteUserResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAdminDeleteUserMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service AdminUserService.
   */
  public static final class AdminUserServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<AdminUserServiceBlockingStub> {
    private AdminUserServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AdminUserServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AdminUserServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Admin: search users with extended details
     * </pre>
     */
    public com.electrahub.proto.user.v1.AdminUserSearchResponse adminSearchUsers(com.electrahub.proto.user.v1.AdminSearchUsersRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAdminSearchUsersMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Admin: get user detail
     * </pre>
     */
    public com.electrahub.proto.user.v1.AdminUserDetailResponse adminGetUserDetail(com.electrahub.proto.user.v1.AdminGetUserDetailRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAdminGetUserDetailMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Admin: update user
     * </pre>
     */
    public com.electrahub.proto.user.v1.AdminUserDetailResponse adminUpdateUser(com.electrahub.proto.user.v1.AdminUpdateUserRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAdminUpdateUserMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Admin: reset user password
     * </pre>
     */
    public com.electrahub.proto.user.v1.AdminResetPasswordResponse adminResetPassword(com.electrahub.proto.user.v1.AdminResetPasswordRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAdminResetPasswordMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Admin: delete user
     * </pre>
     */
    public com.electrahub.proto.user.v1.AdminDeleteUserResponse adminDeleteUser(com.electrahub.proto.user.v1.AdminDeleteUserRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAdminDeleteUserMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service AdminUserService.
   */
  public static final class AdminUserServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<AdminUserServiceFutureStub> {
    private AdminUserServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AdminUserServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AdminUserServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Admin: search users with extended details
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.AdminUserSearchResponse> adminSearchUsers(
        com.electrahub.proto.user.v1.AdminSearchUsersRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAdminSearchUsersMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Admin: get user detail
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.AdminUserDetailResponse> adminGetUserDetail(
        com.electrahub.proto.user.v1.AdminGetUserDetailRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAdminGetUserDetailMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Admin: update user
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.AdminUserDetailResponse> adminUpdateUser(
        com.electrahub.proto.user.v1.AdminUpdateUserRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAdminUpdateUserMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Admin: reset user password
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.AdminResetPasswordResponse> adminResetPassword(
        com.electrahub.proto.user.v1.AdminResetPasswordRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAdminResetPasswordMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Admin: delete user
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.AdminDeleteUserResponse> adminDeleteUser(
        com.electrahub.proto.user.v1.AdminDeleteUserRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAdminDeleteUserMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_ADMIN_SEARCH_USERS = 0;
  private static final int METHODID_ADMIN_GET_USER_DETAIL = 1;
  private static final int METHODID_ADMIN_UPDATE_USER = 2;
  private static final int METHODID_ADMIN_RESET_PASSWORD = 3;
  private static final int METHODID_ADMIN_DELETE_USER = 4;

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
        case METHODID_ADMIN_SEARCH_USERS:
          serviceImpl.adminSearchUsers((com.electrahub.proto.user.v1.AdminSearchUsersRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminUserSearchResponse>) responseObserver);
          break;
        case METHODID_ADMIN_GET_USER_DETAIL:
          serviceImpl.adminGetUserDetail((com.electrahub.proto.user.v1.AdminGetUserDetailRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminUserDetailResponse>) responseObserver);
          break;
        case METHODID_ADMIN_UPDATE_USER:
          serviceImpl.adminUpdateUser((com.electrahub.proto.user.v1.AdminUpdateUserRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminUserDetailResponse>) responseObserver);
          break;
        case METHODID_ADMIN_RESET_PASSWORD:
          serviceImpl.adminResetPassword((com.electrahub.proto.user.v1.AdminResetPasswordRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminResetPasswordResponse>) responseObserver);
          break;
        case METHODID_ADMIN_DELETE_USER:
          serviceImpl.adminDeleteUser((com.electrahub.proto.user.v1.AdminDeleteUserRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.AdminDeleteUserResponse>) responseObserver);
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
          getAdminSearchUsersMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.AdminSearchUsersRequest,
              com.electrahub.proto.user.v1.AdminUserSearchResponse>(
                service, METHODID_ADMIN_SEARCH_USERS)))
        .addMethod(
          getAdminGetUserDetailMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.AdminGetUserDetailRequest,
              com.electrahub.proto.user.v1.AdminUserDetailResponse>(
                service, METHODID_ADMIN_GET_USER_DETAIL)))
        .addMethod(
          getAdminUpdateUserMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.AdminUpdateUserRequest,
              com.electrahub.proto.user.v1.AdminUserDetailResponse>(
                service, METHODID_ADMIN_UPDATE_USER)))
        .addMethod(
          getAdminResetPasswordMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.AdminResetPasswordRequest,
              com.electrahub.proto.user.v1.AdminResetPasswordResponse>(
                service, METHODID_ADMIN_RESET_PASSWORD)))
        .addMethod(
          getAdminDeleteUserMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.AdminDeleteUserRequest,
              com.electrahub.proto.user.v1.AdminDeleteUserResponse>(
                service, METHODID_ADMIN_DELETE_USER)))
        .build();
  }

  private static abstract class AdminUserServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    AdminUserServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.user.v1.UserProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("AdminUserService");
    }
  }

  private static final class AdminUserServiceFileDescriptorSupplier
      extends AdminUserServiceBaseDescriptorSupplier {
    AdminUserServiceFileDescriptorSupplier() {}
  }

  private static final class AdminUserServiceMethodDescriptorSupplier
      extends AdminUserServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    AdminUserServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (AdminUserServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new AdminUserServiceFileDescriptorSupplier())
              .addMethod(getAdminSearchUsersMethod())
              .addMethod(getAdminGetUserDetailMethod())
              .addMethod(getAdminUpdateUserMethod())
              .addMethod(getAdminResetPasswordMethod())
              .addMethod(getAdminDeleteUserMethod())
              .build();
        }
      }
    }
    return result;
  }
}
