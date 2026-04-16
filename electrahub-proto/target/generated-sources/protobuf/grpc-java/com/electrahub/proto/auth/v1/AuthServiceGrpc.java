package com.electrahub.proto.auth.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/auth/v1/auth.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class AuthServiceGrpc {

  private AuthServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.auth.v1.AuthService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.LoginRequest,
      com.electrahub.proto.auth.v1.AuthResponse> getLoginMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Login",
      requestType = com.electrahub.proto.auth.v1.LoginRequest.class,
      responseType = com.electrahub.proto.auth.v1.AuthResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.LoginRequest,
      com.electrahub.proto.auth.v1.AuthResponse> getLoginMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.LoginRequest, com.electrahub.proto.auth.v1.AuthResponse> getLoginMethod;
    if ((getLoginMethod = AuthServiceGrpc.getLoginMethod) == null) {
      synchronized (AuthServiceGrpc.class) {
        if ((getLoginMethod = AuthServiceGrpc.getLoginMethod) == null) {
          AuthServiceGrpc.getLoginMethod = getLoginMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.auth.v1.LoginRequest, com.electrahub.proto.auth.v1.AuthResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Login"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.LoginRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.AuthResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AuthServiceMethodDescriptorSupplier("Login"))
              .build();
        }
      }
    }
    return getLoginMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.RegisterRequest,
      com.electrahub.proto.auth.v1.AuthResponse> getRegisterMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Register",
      requestType = com.electrahub.proto.auth.v1.RegisterRequest.class,
      responseType = com.electrahub.proto.auth.v1.AuthResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.RegisterRequest,
      com.electrahub.proto.auth.v1.AuthResponse> getRegisterMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.RegisterRequest, com.electrahub.proto.auth.v1.AuthResponse> getRegisterMethod;
    if ((getRegisterMethod = AuthServiceGrpc.getRegisterMethod) == null) {
      synchronized (AuthServiceGrpc.class) {
        if ((getRegisterMethod = AuthServiceGrpc.getRegisterMethod) == null) {
          AuthServiceGrpc.getRegisterMethod = getRegisterMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.auth.v1.RegisterRequest, com.electrahub.proto.auth.v1.AuthResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Register"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.RegisterRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.AuthResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AuthServiceMethodDescriptorSupplier("Register"))
              .build();
        }
      }
    }
    return getRegisterMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.RefreshTokenRequest,
      com.electrahub.proto.auth.v1.AuthResponse> getRefreshTokenMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RefreshToken",
      requestType = com.electrahub.proto.auth.v1.RefreshTokenRequest.class,
      responseType = com.electrahub.proto.auth.v1.AuthResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.RefreshTokenRequest,
      com.electrahub.proto.auth.v1.AuthResponse> getRefreshTokenMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.RefreshTokenRequest, com.electrahub.proto.auth.v1.AuthResponse> getRefreshTokenMethod;
    if ((getRefreshTokenMethod = AuthServiceGrpc.getRefreshTokenMethod) == null) {
      synchronized (AuthServiceGrpc.class) {
        if ((getRefreshTokenMethod = AuthServiceGrpc.getRefreshTokenMethod) == null) {
          AuthServiceGrpc.getRefreshTokenMethod = getRefreshTokenMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.auth.v1.RefreshTokenRequest, com.electrahub.proto.auth.v1.AuthResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RefreshToken"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.RefreshTokenRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.AuthResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AuthServiceMethodDescriptorSupplier("RefreshToken"))
              .build();
        }
      }
    }
    return getRefreshTokenMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.LogoutDeviceRequest,
      com.electrahub.proto.auth.v1.LogoutResponse> getLogoutDeviceMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "LogoutDevice",
      requestType = com.electrahub.proto.auth.v1.LogoutDeviceRequest.class,
      responseType = com.electrahub.proto.auth.v1.LogoutResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.LogoutDeviceRequest,
      com.electrahub.proto.auth.v1.LogoutResponse> getLogoutDeviceMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.LogoutDeviceRequest, com.electrahub.proto.auth.v1.LogoutResponse> getLogoutDeviceMethod;
    if ((getLogoutDeviceMethod = AuthServiceGrpc.getLogoutDeviceMethod) == null) {
      synchronized (AuthServiceGrpc.class) {
        if ((getLogoutDeviceMethod = AuthServiceGrpc.getLogoutDeviceMethod) == null) {
          AuthServiceGrpc.getLogoutDeviceMethod = getLogoutDeviceMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.auth.v1.LogoutDeviceRequest, com.electrahub.proto.auth.v1.LogoutResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "LogoutDevice"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.LogoutDeviceRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.LogoutResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AuthServiceMethodDescriptorSupplier("LogoutDevice"))
              .build();
        }
      }
    }
    return getLogoutDeviceMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.LogoutAllRequest,
      com.electrahub.proto.auth.v1.LogoutResponse> getLogoutAllMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "LogoutAll",
      requestType = com.electrahub.proto.auth.v1.LogoutAllRequest.class,
      responseType = com.electrahub.proto.auth.v1.LogoutResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.LogoutAllRequest,
      com.electrahub.proto.auth.v1.LogoutResponse> getLogoutAllMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.LogoutAllRequest, com.electrahub.proto.auth.v1.LogoutResponse> getLogoutAllMethod;
    if ((getLogoutAllMethod = AuthServiceGrpc.getLogoutAllMethod) == null) {
      synchronized (AuthServiceGrpc.class) {
        if ((getLogoutAllMethod = AuthServiceGrpc.getLogoutAllMethod) == null) {
          AuthServiceGrpc.getLogoutAllMethod = getLogoutAllMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.auth.v1.LogoutAllRequest, com.electrahub.proto.auth.v1.LogoutResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "LogoutAll"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.LogoutAllRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.LogoutResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AuthServiceMethodDescriptorSupplier("LogoutAll"))
              .build();
        }
      }
    }
    return getLogoutAllMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.ListCountriesRequest,
      com.electrahub.proto.auth.v1.ListCountriesResponse> getListCountriesMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListCountries",
      requestType = com.electrahub.proto.auth.v1.ListCountriesRequest.class,
      responseType = com.electrahub.proto.auth.v1.ListCountriesResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.ListCountriesRequest,
      com.electrahub.proto.auth.v1.ListCountriesResponse> getListCountriesMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.auth.v1.ListCountriesRequest, com.electrahub.proto.auth.v1.ListCountriesResponse> getListCountriesMethod;
    if ((getListCountriesMethod = AuthServiceGrpc.getListCountriesMethod) == null) {
      synchronized (AuthServiceGrpc.class) {
        if ((getListCountriesMethod = AuthServiceGrpc.getListCountriesMethod) == null) {
          AuthServiceGrpc.getListCountriesMethod = getListCountriesMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.auth.v1.ListCountriesRequest, com.electrahub.proto.auth.v1.ListCountriesResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListCountries"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.ListCountriesRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.auth.v1.ListCountriesResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AuthServiceMethodDescriptorSupplier("ListCountries"))
              .build();
        }
      }
    }
    return getListCountriesMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static AuthServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AuthServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AuthServiceStub>() {
        @java.lang.Override
        public AuthServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AuthServiceStub(channel, callOptions);
        }
      };
    return AuthServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static AuthServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AuthServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AuthServiceBlockingStub>() {
        @java.lang.Override
        public AuthServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AuthServiceBlockingStub(channel, callOptions);
        }
      };
    return AuthServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static AuthServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AuthServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AuthServiceFutureStub>() {
        @java.lang.Override
        public AuthServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AuthServiceFutureStub(channel, callOptions);
        }
      };
    return AuthServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     * <pre>
     * Authenticate user and return access + refresh tokens
     * </pre>
     */
    default void login(com.electrahub.proto.auth.v1.LoginRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.AuthResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getLoginMethod(), responseObserver);
    }

    /**
     * <pre>
     * Register a new user and return access + refresh tokens
     * </pre>
     */
    default void register(com.electrahub.proto.auth.v1.RegisterRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.AuthResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getRegisterMethod(), responseObserver);
    }

    /**
     * <pre>
     * Refresh an expired access token using a refresh token
     * </pre>
     */
    default void refreshToken(com.electrahub.proto.auth.v1.RefreshTokenRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.AuthResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getRefreshTokenMethod(), responseObserver);
    }

    /**
     * <pre>
     * Logout current device (invalidate refresh token for this device)
     * </pre>
     */
    default void logoutDevice(com.electrahub.proto.auth.v1.LogoutDeviceRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.LogoutResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getLogoutDeviceMethod(), responseObserver);
    }

    /**
     * <pre>
     * Logout all devices (invalidate all refresh tokens for this user)
     * </pre>
     */
    default void logoutAll(com.electrahub.proto.auth.v1.LogoutAllRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.LogoutResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getLogoutAllMethod(), responseObserver);
    }

    /**
     * <pre>
     * List all supported countries
     * </pre>
     */
    default void listCountries(com.electrahub.proto.auth.v1.ListCountriesRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.ListCountriesResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListCountriesMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service AuthService.
   */
  public static abstract class AuthServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return AuthServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service AuthService.
   */
  public static final class AuthServiceStub
      extends io.grpc.stub.AbstractAsyncStub<AuthServiceStub> {
    private AuthServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AuthServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AuthServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     * Authenticate user and return access + refresh tokens
     * </pre>
     */
    public void login(com.electrahub.proto.auth.v1.LoginRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.AuthResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getLoginMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Register a new user and return access + refresh tokens
     * </pre>
     */
    public void register(com.electrahub.proto.auth.v1.RegisterRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.AuthResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getRegisterMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Refresh an expired access token using a refresh token
     * </pre>
     */
    public void refreshToken(com.electrahub.proto.auth.v1.RefreshTokenRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.AuthResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getRefreshTokenMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Logout current device (invalidate refresh token for this device)
     * </pre>
     */
    public void logoutDevice(com.electrahub.proto.auth.v1.LogoutDeviceRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.LogoutResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getLogoutDeviceMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Logout all devices (invalidate all refresh tokens for this user)
     * </pre>
     */
    public void logoutAll(com.electrahub.proto.auth.v1.LogoutAllRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.LogoutResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getLogoutAllMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * List all supported countries
     * </pre>
     */
    public void listCountries(com.electrahub.proto.auth.v1.ListCountriesRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.ListCountriesResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListCountriesMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service AuthService.
   */
  public static final class AuthServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<AuthServiceBlockingStub> {
    private AuthServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AuthServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AuthServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Authenticate user and return access + refresh tokens
     * </pre>
     */
    public com.electrahub.proto.auth.v1.AuthResponse login(com.electrahub.proto.auth.v1.LoginRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getLoginMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Register a new user and return access + refresh tokens
     * </pre>
     */
    public com.electrahub.proto.auth.v1.AuthResponse register(com.electrahub.proto.auth.v1.RegisterRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getRegisterMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Refresh an expired access token using a refresh token
     * </pre>
     */
    public com.electrahub.proto.auth.v1.AuthResponse refreshToken(com.electrahub.proto.auth.v1.RefreshTokenRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getRefreshTokenMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Logout current device (invalidate refresh token for this device)
     * </pre>
     */
    public com.electrahub.proto.auth.v1.LogoutResponse logoutDevice(com.electrahub.proto.auth.v1.LogoutDeviceRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getLogoutDeviceMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Logout all devices (invalidate all refresh tokens for this user)
     * </pre>
     */
    public com.electrahub.proto.auth.v1.LogoutResponse logoutAll(com.electrahub.proto.auth.v1.LogoutAllRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getLogoutAllMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * List all supported countries
     * </pre>
     */
    public com.electrahub.proto.auth.v1.ListCountriesResponse listCountries(com.electrahub.proto.auth.v1.ListCountriesRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListCountriesMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service AuthService.
   */
  public static final class AuthServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<AuthServiceFutureStub> {
    private AuthServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AuthServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AuthServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Authenticate user and return access + refresh tokens
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.auth.v1.AuthResponse> login(
        com.electrahub.proto.auth.v1.LoginRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getLoginMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Register a new user and return access + refresh tokens
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.auth.v1.AuthResponse> register(
        com.electrahub.proto.auth.v1.RegisterRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getRegisterMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Refresh an expired access token using a refresh token
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.auth.v1.AuthResponse> refreshToken(
        com.electrahub.proto.auth.v1.RefreshTokenRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getRefreshTokenMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Logout current device (invalidate refresh token for this device)
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.auth.v1.LogoutResponse> logoutDevice(
        com.electrahub.proto.auth.v1.LogoutDeviceRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getLogoutDeviceMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Logout all devices (invalidate all refresh tokens for this user)
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.auth.v1.LogoutResponse> logoutAll(
        com.electrahub.proto.auth.v1.LogoutAllRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getLogoutAllMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * List all supported countries
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.auth.v1.ListCountriesResponse> listCountries(
        com.electrahub.proto.auth.v1.ListCountriesRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListCountriesMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_LOGIN = 0;
  private static final int METHODID_REGISTER = 1;
  private static final int METHODID_REFRESH_TOKEN = 2;
  private static final int METHODID_LOGOUT_DEVICE = 3;
  private static final int METHODID_LOGOUT_ALL = 4;
  private static final int METHODID_LIST_COUNTRIES = 5;

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
        case METHODID_LOGIN:
          serviceImpl.login((com.electrahub.proto.auth.v1.LoginRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.AuthResponse>) responseObserver);
          break;
        case METHODID_REGISTER:
          serviceImpl.register((com.electrahub.proto.auth.v1.RegisterRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.AuthResponse>) responseObserver);
          break;
        case METHODID_REFRESH_TOKEN:
          serviceImpl.refreshToken((com.electrahub.proto.auth.v1.RefreshTokenRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.AuthResponse>) responseObserver);
          break;
        case METHODID_LOGOUT_DEVICE:
          serviceImpl.logoutDevice((com.electrahub.proto.auth.v1.LogoutDeviceRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.LogoutResponse>) responseObserver);
          break;
        case METHODID_LOGOUT_ALL:
          serviceImpl.logoutAll((com.electrahub.proto.auth.v1.LogoutAllRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.LogoutResponse>) responseObserver);
          break;
        case METHODID_LIST_COUNTRIES:
          serviceImpl.listCountries((com.electrahub.proto.auth.v1.ListCountriesRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.auth.v1.ListCountriesResponse>) responseObserver);
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
          getLoginMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.auth.v1.LoginRequest,
              com.electrahub.proto.auth.v1.AuthResponse>(
                service, METHODID_LOGIN)))
        .addMethod(
          getRegisterMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.auth.v1.RegisterRequest,
              com.electrahub.proto.auth.v1.AuthResponse>(
                service, METHODID_REGISTER)))
        .addMethod(
          getRefreshTokenMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.auth.v1.RefreshTokenRequest,
              com.electrahub.proto.auth.v1.AuthResponse>(
                service, METHODID_REFRESH_TOKEN)))
        .addMethod(
          getLogoutDeviceMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.auth.v1.LogoutDeviceRequest,
              com.electrahub.proto.auth.v1.LogoutResponse>(
                service, METHODID_LOGOUT_DEVICE)))
        .addMethod(
          getLogoutAllMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.auth.v1.LogoutAllRequest,
              com.electrahub.proto.auth.v1.LogoutResponse>(
                service, METHODID_LOGOUT_ALL)))
        .addMethod(
          getListCountriesMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.auth.v1.ListCountriesRequest,
              com.electrahub.proto.auth.v1.ListCountriesResponse>(
                service, METHODID_LIST_COUNTRIES)))
        .build();
  }

  private static abstract class AuthServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    AuthServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.auth.v1.AuthProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("AuthService");
    }
  }

  private static final class AuthServiceFileDescriptorSupplier
      extends AuthServiceBaseDescriptorSupplier {
    AuthServiceFileDescriptorSupplier() {}
  }

  private static final class AuthServiceMethodDescriptorSupplier
      extends AuthServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    AuthServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (AuthServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new AuthServiceFileDescriptorSupplier())
              .addMethod(getLoginMethod())
              .addMethod(getRegisterMethod())
              .addMethod(getRefreshTokenMethod())
              .addMethod(getLogoutDeviceMethod())
              .addMethod(getLogoutAllMethod())
              .addMethod(getListCountriesMethod())
              .build();
        }
      }
    }
    return result;
  }
}
