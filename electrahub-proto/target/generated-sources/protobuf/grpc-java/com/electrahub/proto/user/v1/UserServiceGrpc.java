package com.electrahub.proto.user.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/user/v1/user.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class UserServiceGrpc {

  private UserServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.user.v1.UserService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.RegisterUserRequest,
      com.electrahub.proto.user.v1.UserPrincipalResponse> getRegisterUserMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "RegisterUser",
      requestType = com.electrahub.proto.user.v1.RegisterUserRequest.class,
      responseType = com.electrahub.proto.user.v1.UserPrincipalResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.RegisterUserRequest,
      com.electrahub.proto.user.v1.UserPrincipalResponse> getRegisterUserMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.RegisterUserRequest, com.electrahub.proto.user.v1.UserPrincipalResponse> getRegisterUserMethod;
    if ((getRegisterUserMethod = UserServiceGrpc.getRegisterUserMethod) == null) {
      synchronized (UserServiceGrpc.class) {
        if ((getRegisterUserMethod = UserServiceGrpc.getRegisterUserMethod) == null) {
          UserServiceGrpc.getRegisterUserMethod = getRegisterUserMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.RegisterUserRequest, com.electrahub.proto.user.v1.UserPrincipalResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "RegisterUser"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.RegisterUserRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.UserPrincipalResponse.getDefaultInstance()))
              .setSchemaDescriptor(new UserServiceMethodDescriptorSupplier("RegisterUser"))
              .build();
        }
      }
    }
    return getRegisterUserMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AuthenticateUserRequest,
      com.electrahub.proto.user.v1.UserPrincipalResponse> getAuthenticateUserMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AuthenticateUser",
      requestType = com.electrahub.proto.user.v1.AuthenticateUserRequest.class,
      responseType = com.electrahub.proto.user.v1.UserPrincipalResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AuthenticateUserRequest,
      com.electrahub.proto.user.v1.UserPrincipalResponse> getAuthenticateUserMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.AuthenticateUserRequest, com.electrahub.proto.user.v1.UserPrincipalResponse> getAuthenticateUserMethod;
    if ((getAuthenticateUserMethod = UserServiceGrpc.getAuthenticateUserMethod) == null) {
      synchronized (UserServiceGrpc.class) {
        if ((getAuthenticateUserMethod = UserServiceGrpc.getAuthenticateUserMethod) == null) {
          UserServiceGrpc.getAuthenticateUserMethod = getAuthenticateUserMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.AuthenticateUserRequest, com.electrahub.proto.user.v1.UserPrincipalResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "AuthenticateUser"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.AuthenticateUserRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.UserPrincipalResponse.getDefaultInstance()))
              .setSchemaDescriptor(new UserServiceMethodDescriptorSupplier("AuthenticateUser"))
              .build();
        }
      }
    }
    return getAuthenticateUserMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetUserPrincipalRequest,
      com.electrahub.proto.user.v1.UserPrincipalResponse> getGetUserPrincipalMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetUserPrincipal",
      requestType = com.electrahub.proto.user.v1.GetUserPrincipalRequest.class,
      responseType = com.electrahub.proto.user.v1.UserPrincipalResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetUserPrincipalRequest,
      com.electrahub.proto.user.v1.UserPrincipalResponse> getGetUserPrincipalMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetUserPrincipalRequest, com.electrahub.proto.user.v1.UserPrincipalResponse> getGetUserPrincipalMethod;
    if ((getGetUserPrincipalMethod = UserServiceGrpc.getGetUserPrincipalMethod) == null) {
      synchronized (UserServiceGrpc.class) {
        if ((getGetUserPrincipalMethod = UserServiceGrpc.getGetUserPrincipalMethod) == null) {
          UserServiceGrpc.getGetUserPrincipalMethod = getGetUserPrincipalMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.GetUserPrincipalRequest, com.electrahub.proto.user.v1.UserPrincipalResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetUserPrincipal"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.GetUserPrincipalRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.UserPrincipalResponse.getDefaultInstance()))
              .setSchemaDescriptor(new UserServiceMethodDescriptorSupplier("GetUserPrincipal"))
              .build();
        }
      }
    }
    return getGetUserPrincipalMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetUserProfileRequest,
      com.electrahub.proto.user.v1.UserProfileResponse> getGetUserProfileMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetUserProfile",
      requestType = com.electrahub.proto.user.v1.GetUserProfileRequest.class,
      responseType = com.electrahub.proto.user.v1.UserProfileResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetUserProfileRequest,
      com.electrahub.proto.user.v1.UserProfileResponse> getGetUserProfileMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.GetUserProfileRequest, com.electrahub.proto.user.v1.UserProfileResponse> getGetUserProfileMethod;
    if ((getGetUserProfileMethod = UserServiceGrpc.getGetUserProfileMethod) == null) {
      synchronized (UserServiceGrpc.class) {
        if ((getGetUserProfileMethod = UserServiceGrpc.getGetUserProfileMethod) == null) {
          UserServiceGrpc.getGetUserProfileMethod = getGetUserProfileMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.GetUserProfileRequest, com.electrahub.proto.user.v1.UserProfileResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetUserProfile"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.GetUserProfileRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.UserProfileResponse.getDefaultInstance()))
              .setSchemaDescriptor(new UserServiceMethodDescriptorSupplier("GetUserProfile"))
              .build();
        }
      }
    }
    return getGetUserProfileMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.UpdateUserProfileRequest,
      com.electrahub.proto.user.v1.UserProfileResponse> getUpdateUserProfileMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "UpdateUserProfile",
      requestType = com.electrahub.proto.user.v1.UpdateUserProfileRequest.class,
      responseType = com.electrahub.proto.user.v1.UserProfileResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.UpdateUserProfileRequest,
      com.electrahub.proto.user.v1.UserProfileResponse> getUpdateUserProfileMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.UpdateUserProfileRequest, com.electrahub.proto.user.v1.UserProfileResponse> getUpdateUserProfileMethod;
    if ((getUpdateUserProfileMethod = UserServiceGrpc.getUpdateUserProfileMethod) == null) {
      synchronized (UserServiceGrpc.class) {
        if ((getUpdateUserProfileMethod = UserServiceGrpc.getUpdateUserProfileMethod) == null) {
          UserServiceGrpc.getUpdateUserProfileMethod = getUpdateUserProfileMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.UpdateUserProfileRequest, com.electrahub.proto.user.v1.UserProfileResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "UpdateUserProfile"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.UpdateUserProfileRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.UserProfileResponse.getDefaultInstance()))
              .setSchemaDescriptor(new UserServiceMethodDescriptorSupplier("UpdateUserProfile"))
              .build();
        }
      }
    }
    return getUpdateUserProfileMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.SearchUsersRequest,
      com.electrahub.proto.user.v1.UserSearchResponse> getSearchUsersMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SearchUsers",
      requestType = com.electrahub.proto.user.v1.SearchUsersRequest.class,
      responseType = com.electrahub.proto.user.v1.UserSearchResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.SearchUsersRequest,
      com.electrahub.proto.user.v1.UserSearchResponse> getSearchUsersMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.SearchUsersRequest, com.electrahub.proto.user.v1.UserSearchResponse> getSearchUsersMethod;
    if ((getSearchUsersMethod = UserServiceGrpc.getSearchUsersMethod) == null) {
      synchronized (UserServiceGrpc.class) {
        if ((getSearchUsersMethod = UserServiceGrpc.getSearchUsersMethod) == null) {
          UserServiceGrpc.getSearchUsersMethod = getSearchUsersMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.SearchUsersRequest, com.electrahub.proto.user.v1.UserSearchResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SearchUsers"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.SearchUsersRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.UserSearchResponse.getDefaultInstance()))
              .setSchemaDescriptor(new UserServiceMethodDescriptorSupplier("SearchUsers"))
              .build();
        }
      }
    }
    return getSearchUsersMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.CountUsersRequest,
      com.electrahub.proto.user.v1.UserCountResponse> getCountUsersMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CountUsers",
      requestType = com.electrahub.proto.user.v1.CountUsersRequest.class,
      responseType = com.electrahub.proto.user.v1.UserCountResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.CountUsersRequest,
      com.electrahub.proto.user.v1.UserCountResponse> getCountUsersMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.CountUsersRequest, com.electrahub.proto.user.v1.UserCountResponse> getCountUsersMethod;
    if ((getCountUsersMethod = UserServiceGrpc.getCountUsersMethod) == null) {
      synchronized (UserServiceGrpc.class) {
        if ((getCountUsersMethod = UserServiceGrpc.getCountUsersMethod) == null) {
          UserServiceGrpc.getCountUsersMethod = getCountUsersMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.CountUsersRequest, com.electrahub.proto.user.v1.UserCountResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CountUsers"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.CountUsersRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.UserCountResponse.getDefaultInstance()))
              .setSchemaDescriptor(new UserServiceMethodDescriptorSupplier("CountUsers"))
              .build();
        }
      }
    }
    return getCountUsersMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.ListCountriesRequest,
      com.electrahub.proto.user.v1.ListCountriesResponse> getListCountriesMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListCountries",
      requestType = com.electrahub.proto.user.v1.ListCountriesRequest.class,
      responseType = com.electrahub.proto.user.v1.ListCountriesResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.ListCountriesRequest,
      com.electrahub.proto.user.v1.ListCountriesResponse> getListCountriesMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.user.v1.ListCountriesRequest, com.electrahub.proto.user.v1.ListCountriesResponse> getListCountriesMethod;
    if ((getListCountriesMethod = UserServiceGrpc.getListCountriesMethod) == null) {
      synchronized (UserServiceGrpc.class) {
        if ((getListCountriesMethod = UserServiceGrpc.getListCountriesMethod) == null) {
          UserServiceGrpc.getListCountriesMethod = getListCountriesMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.user.v1.ListCountriesRequest, com.electrahub.proto.user.v1.ListCountriesResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListCountries"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.ListCountriesRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.user.v1.ListCountriesResponse.getDefaultInstance()))
              .setSchemaDescriptor(new UserServiceMethodDescriptorSupplier("ListCountries"))
              .build();
        }
      }
    }
    return getListCountriesMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static UserServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<UserServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<UserServiceStub>() {
        @java.lang.Override
        public UserServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new UserServiceStub(channel, callOptions);
        }
      };
    return UserServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static UserServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<UserServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<UserServiceBlockingStub>() {
        @java.lang.Override
        public UserServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new UserServiceBlockingStub(channel, callOptions);
        }
      };
    return UserServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static UserServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<UserServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<UserServiceFutureStub>() {
        @java.lang.Override
        public UserServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new UserServiceFutureStub(channel, callOptions);
        }
      };
    return UserServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     * <pre>
     * Register a new user (called by auth-service)
     * </pre>
     */
    default void registerUser(com.electrahub.proto.user.v1.RegisterUserRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserPrincipalResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getRegisterUserMethod(), responseObserver);
    }

    /**
     * <pre>
     * Authenticate a user by email/password
     * </pre>
     */
    default void authenticateUser(com.electrahub.proto.user.v1.AuthenticateUserRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserPrincipalResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAuthenticateUserMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get user principal by ID
     * </pre>
     */
    default void getUserPrincipal(com.electrahub.proto.user.v1.GetUserPrincipalRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserPrincipalResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetUserPrincipalMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get full user profile
     * </pre>
     */
    default void getUserProfile(com.electrahub.proto.user.v1.GetUserProfileRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserProfileResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetUserProfileMethod(), responseObserver);
    }

    /**
     * <pre>
     * Update user profile
     * </pre>
     */
    default void updateUserProfile(com.electrahub.proto.user.v1.UpdateUserProfileRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserProfileResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getUpdateUserProfileMethod(), responseObserver);
    }

    /**
     * <pre>
     * Search users with pagination
     * </pre>
     */
    default void searchUsers(com.electrahub.proto.user.v1.SearchUsersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserSearchResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getSearchUsersMethod(), responseObserver);
    }

    /**
     * <pre>
     * Count users matching a query
     * </pre>
     */
    default void countUsers(com.electrahub.proto.user.v1.CountUsersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserCountResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCountUsersMethod(), responseObserver);
    }

    /**
     * <pre>
     * List all countries
     * </pre>
     */
    default void listCountries(com.electrahub.proto.user.v1.ListCountriesRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.ListCountriesResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListCountriesMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service UserService.
   */
  public static abstract class UserServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return UserServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service UserService.
   */
  public static final class UserServiceStub
      extends io.grpc.stub.AbstractAsyncStub<UserServiceStub> {
    private UserServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected UserServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new UserServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     * Register a new user (called by auth-service)
     * </pre>
     */
    public void registerUser(com.electrahub.proto.user.v1.RegisterUserRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserPrincipalResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getRegisterUserMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Authenticate a user by email/password
     * </pre>
     */
    public void authenticateUser(com.electrahub.proto.user.v1.AuthenticateUserRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserPrincipalResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAuthenticateUserMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get user principal by ID
     * </pre>
     */
    public void getUserPrincipal(com.electrahub.proto.user.v1.GetUserPrincipalRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserPrincipalResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetUserPrincipalMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get full user profile
     * </pre>
     */
    public void getUserProfile(com.electrahub.proto.user.v1.GetUserProfileRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserProfileResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetUserProfileMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Update user profile
     * </pre>
     */
    public void updateUserProfile(com.electrahub.proto.user.v1.UpdateUserProfileRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserProfileResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getUpdateUserProfileMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Search users with pagination
     * </pre>
     */
    public void searchUsers(com.electrahub.proto.user.v1.SearchUsersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserSearchResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getSearchUsersMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Count users matching a query
     * </pre>
     */
    public void countUsers(com.electrahub.proto.user.v1.CountUsersRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserCountResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCountUsersMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * List all countries
     * </pre>
     */
    public void listCountries(com.electrahub.proto.user.v1.ListCountriesRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.ListCountriesResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListCountriesMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service UserService.
   */
  public static final class UserServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<UserServiceBlockingStub> {
    private UserServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected UserServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new UserServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Register a new user (called by auth-service)
     * </pre>
     */
    public com.electrahub.proto.user.v1.UserPrincipalResponse registerUser(com.electrahub.proto.user.v1.RegisterUserRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getRegisterUserMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Authenticate a user by email/password
     * </pre>
     */
    public com.electrahub.proto.user.v1.UserPrincipalResponse authenticateUser(com.electrahub.proto.user.v1.AuthenticateUserRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAuthenticateUserMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get user principal by ID
     * </pre>
     */
    public com.electrahub.proto.user.v1.UserPrincipalResponse getUserPrincipal(com.electrahub.proto.user.v1.GetUserPrincipalRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetUserPrincipalMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get full user profile
     * </pre>
     */
    public com.electrahub.proto.user.v1.UserProfileResponse getUserProfile(com.electrahub.proto.user.v1.GetUserProfileRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetUserProfileMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Update user profile
     * </pre>
     */
    public com.electrahub.proto.user.v1.UserProfileResponse updateUserProfile(com.electrahub.proto.user.v1.UpdateUserProfileRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getUpdateUserProfileMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Search users with pagination
     * </pre>
     */
    public com.electrahub.proto.user.v1.UserSearchResponse searchUsers(com.electrahub.proto.user.v1.SearchUsersRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getSearchUsersMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Count users matching a query
     * </pre>
     */
    public com.electrahub.proto.user.v1.UserCountResponse countUsers(com.electrahub.proto.user.v1.CountUsersRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCountUsersMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * List all countries
     * </pre>
     */
    public com.electrahub.proto.user.v1.ListCountriesResponse listCountries(com.electrahub.proto.user.v1.ListCountriesRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListCountriesMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service UserService.
   */
  public static final class UserServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<UserServiceFutureStub> {
    private UserServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected UserServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new UserServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Register a new user (called by auth-service)
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.UserPrincipalResponse> registerUser(
        com.electrahub.proto.user.v1.RegisterUserRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getRegisterUserMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Authenticate a user by email/password
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.UserPrincipalResponse> authenticateUser(
        com.electrahub.proto.user.v1.AuthenticateUserRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAuthenticateUserMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get user principal by ID
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.UserPrincipalResponse> getUserPrincipal(
        com.electrahub.proto.user.v1.GetUserPrincipalRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetUserPrincipalMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get full user profile
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.UserProfileResponse> getUserProfile(
        com.electrahub.proto.user.v1.GetUserProfileRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetUserProfileMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Update user profile
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.UserProfileResponse> updateUserProfile(
        com.electrahub.proto.user.v1.UpdateUserProfileRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getUpdateUserProfileMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Search users with pagination
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.UserSearchResponse> searchUsers(
        com.electrahub.proto.user.v1.SearchUsersRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getSearchUsersMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Count users matching a query
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.UserCountResponse> countUsers(
        com.electrahub.proto.user.v1.CountUsersRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCountUsersMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * List all countries
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.user.v1.ListCountriesResponse> listCountries(
        com.electrahub.proto.user.v1.ListCountriesRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListCountriesMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_REGISTER_USER = 0;
  private static final int METHODID_AUTHENTICATE_USER = 1;
  private static final int METHODID_GET_USER_PRINCIPAL = 2;
  private static final int METHODID_GET_USER_PROFILE = 3;
  private static final int METHODID_UPDATE_USER_PROFILE = 4;
  private static final int METHODID_SEARCH_USERS = 5;
  private static final int METHODID_COUNT_USERS = 6;
  private static final int METHODID_LIST_COUNTRIES = 7;

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
        case METHODID_REGISTER_USER:
          serviceImpl.registerUser((com.electrahub.proto.user.v1.RegisterUserRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserPrincipalResponse>) responseObserver);
          break;
        case METHODID_AUTHENTICATE_USER:
          serviceImpl.authenticateUser((com.electrahub.proto.user.v1.AuthenticateUserRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserPrincipalResponse>) responseObserver);
          break;
        case METHODID_GET_USER_PRINCIPAL:
          serviceImpl.getUserPrincipal((com.electrahub.proto.user.v1.GetUserPrincipalRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserPrincipalResponse>) responseObserver);
          break;
        case METHODID_GET_USER_PROFILE:
          serviceImpl.getUserProfile((com.electrahub.proto.user.v1.GetUserProfileRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserProfileResponse>) responseObserver);
          break;
        case METHODID_UPDATE_USER_PROFILE:
          serviceImpl.updateUserProfile((com.electrahub.proto.user.v1.UpdateUserProfileRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserProfileResponse>) responseObserver);
          break;
        case METHODID_SEARCH_USERS:
          serviceImpl.searchUsers((com.electrahub.proto.user.v1.SearchUsersRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserSearchResponse>) responseObserver);
          break;
        case METHODID_COUNT_USERS:
          serviceImpl.countUsers((com.electrahub.proto.user.v1.CountUsersRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.UserCountResponse>) responseObserver);
          break;
        case METHODID_LIST_COUNTRIES:
          serviceImpl.listCountries((com.electrahub.proto.user.v1.ListCountriesRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.user.v1.ListCountriesResponse>) responseObserver);
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
          getRegisterUserMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.RegisterUserRequest,
              com.electrahub.proto.user.v1.UserPrincipalResponse>(
                service, METHODID_REGISTER_USER)))
        .addMethod(
          getAuthenticateUserMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.AuthenticateUserRequest,
              com.electrahub.proto.user.v1.UserPrincipalResponse>(
                service, METHODID_AUTHENTICATE_USER)))
        .addMethod(
          getGetUserPrincipalMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.GetUserPrincipalRequest,
              com.electrahub.proto.user.v1.UserPrincipalResponse>(
                service, METHODID_GET_USER_PRINCIPAL)))
        .addMethod(
          getGetUserProfileMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.GetUserProfileRequest,
              com.electrahub.proto.user.v1.UserProfileResponse>(
                service, METHODID_GET_USER_PROFILE)))
        .addMethod(
          getUpdateUserProfileMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.UpdateUserProfileRequest,
              com.electrahub.proto.user.v1.UserProfileResponse>(
                service, METHODID_UPDATE_USER_PROFILE)))
        .addMethod(
          getSearchUsersMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.SearchUsersRequest,
              com.electrahub.proto.user.v1.UserSearchResponse>(
                service, METHODID_SEARCH_USERS)))
        .addMethod(
          getCountUsersMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.CountUsersRequest,
              com.electrahub.proto.user.v1.UserCountResponse>(
                service, METHODID_COUNT_USERS)))
        .addMethod(
          getListCountriesMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.user.v1.ListCountriesRequest,
              com.electrahub.proto.user.v1.ListCountriesResponse>(
                service, METHODID_LIST_COUNTRIES)))
        .build();
  }

  private static abstract class UserServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    UserServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.user.v1.UserProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("UserService");
    }
  }

  private static final class UserServiceFileDescriptorSupplier
      extends UserServiceBaseDescriptorSupplier {
    UserServiceFileDescriptorSupplier() {}
  }

  private static final class UserServiceMethodDescriptorSupplier
      extends UserServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    UserServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (UserServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new UserServiceFileDescriptorSupplier())
              .addMethod(getRegisterUserMethod())
              .addMethod(getAuthenticateUserMethod())
              .addMethod(getGetUserPrincipalMethod())
              .addMethod(getGetUserProfileMethod())
              .addMethod(getUpdateUserProfileMethod())
              .addMethod(getSearchUsersMethod())
              .addMethod(getCountUsersMethod())
              .addMethod(getListCountriesMethod())
              .build();
        }
      }
    }
    return result;
  }
}
