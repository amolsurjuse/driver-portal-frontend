package com.electrahub.proto.payment.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.68.0)",
    comments = "Source: electrahub/payment/v1/payment.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class PaymentServiceGrpc {

  private PaymentServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "electrahub.payment.v1.PaymentService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.CreateWalletAccountRequest,
      com.electrahub.proto.payment.v1.CreateWalletAccountResponse> getCreateWalletAccountMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateWalletAccount",
      requestType = com.electrahub.proto.payment.v1.CreateWalletAccountRequest.class,
      responseType = com.electrahub.proto.payment.v1.CreateWalletAccountResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.CreateWalletAccountRequest,
      com.electrahub.proto.payment.v1.CreateWalletAccountResponse> getCreateWalletAccountMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.CreateWalletAccountRequest, com.electrahub.proto.payment.v1.CreateWalletAccountResponse> getCreateWalletAccountMethod;
    if ((getCreateWalletAccountMethod = PaymentServiceGrpc.getCreateWalletAccountMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getCreateWalletAccountMethod = PaymentServiceGrpc.getCreateWalletAccountMethod) == null) {
          PaymentServiceGrpc.getCreateWalletAccountMethod = getCreateWalletAccountMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.CreateWalletAccountRequest, com.electrahub.proto.payment.v1.CreateWalletAccountResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateWalletAccount"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.CreateWalletAccountRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.CreateWalletAccountResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("CreateWalletAccount"))
              .build();
        }
      }
    }
    return getCreateWalletAccountMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.GetPaymentStateRequest,
      com.electrahub.proto.payment.v1.PaymentStateResponse> getGetPaymentStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetPaymentState",
      requestType = com.electrahub.proto.payment.v1.GetPaymentStateRequest.class,
      responseType = com.electrahub.proto.payment.v1.PaymentStateResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.GetPaymentStateRequest,
      com.electrahub.proto.payment.v1.PaymentStateResponse> getGetPaymentStateMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.GetPaymentStateRequest, com.electrahub.proto.payment.v1.PaymentStateResponse> getGetPaymentStateMethod;
    if ((getGetPaymentStateMethod = PaymentServiceGrpc.getGetPaymentStateMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getGetPaymentStateMethod = PaymentServiceGrpc.getGetPaymentStateMethod) == null) {
          PaymentServiceGrpc.getGetPaymentStateMethod = getGetPaymentStateMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.GetPaymentStateRequest, com.electrahub.proto.payment.v1.PaymentStateResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetPaymentState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.GetPaymentStateRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.PaymentStateResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("GetPaymentState"))
              .build();
        }
      }
    }
    return getGetPaymentStateMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.GetWalletRequest,
      com.electrahub.proto.payment.v1.WalletStateResponse> getGetWalletMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetWallet",
      requestType = com.electrahub.proto.payment.v1.GetWalletRequest.class,
      responseType = com.electrahub.proto.payment.v1.WalletStateResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.GetWalletRequest,
      com.electrahub.proto.payment.v1.WalletStateResponse> getGetWalletMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.GetWalletRequest, com.electrahub.proto.payment.v1.WalletStateResponse> getGetWalletMethod;
    if ((getGetWalletMethod = PaymentServiceGrpc.getGetWalletMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getGetWalletMethod = PaymentServiceGrpc.getGetWalletMethod) == null) {
          PaymentServiceGrpc.getGetWalletMethod = getGetWalletMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.GetWalletRequest, com.electrahub.proto.payment.v1.WalletStateResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetWallet"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.GetWalletRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.WalletStateResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("GetWallet"))
              .build();
        }
      }
    }
    return getGetWalletMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.ListTopUpsRequest,
      com.electrahub.proto.payment.v1.ListTopUpsResponse> getListTopUpsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListTopUps",
      requestType = com.electrahub.proto.payment.v1.ListTopUpsRequest.class,
      responseType = com.electrahub.proto.payment.v1.ListTopUpsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.ListTopUpsRequest,
      com.electrahub.proto.payment.v1.ListTopUpsResponse> getListTopUpsMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.ListTopUpsRequest, com.electrahub.proto.payment.v1.ListTopUpsResponse> getListTopUpsMethod;
    if ((getListTopUpsMethod = PaymentServiceGrpc.getListTopUpsMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getListTopUpsMethod = PaymentServiceGrpc.getListTopUpsMethod) == null) {
          PaymentServiceGrpc.getListTopUpsMethod = getListTopUpsMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.ListTopUpsRequest, com.electrahub.proto.payment.v1.ListTopUpsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListTopUps"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.ListTopUpsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.ListTopUpsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("ListTopUps"))
              .build();
        }
      }
    }
    return getListTopUpsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.AddTopUpRequest,
      com.electrahub.proto.payment.v1.TopUpCreatedResponse> getAddTopUpMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AddTopUp",
      requestType = com.electrahub.proto.payment.v1.AddTopUpRequest.class,
      responseType = com.electrahub.proto.payment.v1.TopUpCreatedResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.AddTopUpRequest,
      com.electrahub.proto.payment.v1.TopUpCreatedResponse> getAddTopUpMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.AddTopUpRequest, com.electrahub.proto.payment.v1.TopUpCreatedResponse> getAddTopUpMethod;
    if ((getAddTopUpMethod = PaymentServiceGrpc.getAddTopUpMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getAddTopUpMethod = PaymentServiceGrpc.getAddTopUpMethod) == null) {
          PaymentServiceGrpc.getAddTopUpMethod = getAddTopUpMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.AddTopUpRequest, com.electrahub.proto.payment.v1.TopUpCreatedResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "AddTopUp"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.AddTopUpRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.TopUpCreatedResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("AddTopUp"))
              .build();
        }
      }
    }
    return getAddTopUpMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.ListCardsRequest,
      com.electrahub.proto.payment.v1.ListCardsResponse> getListCardsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListCards",
      requestType = com.electrahub.proto.payment.v1.ListCardsRequest.class,
      responseType = com.electrahub.proto.payment.v1.ListCardsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.ListCardsRequest,
      com.electrahub.proto.payment.v1.ListCardsResponse> getListCardsMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.ListCardsRequest, com.electrahub.proto.payment.v1.ListCardsResponse> getListCardsMethod;
    if ((getListCardsMethod = PaymentServiceGrpc.getListCardsMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getListCardsMethod = PaymentServiceGrpc.getListCardsMethod) == null) {
          PaymentServiceGrpc.getListCardsMethod = getListCardsMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.ListCardsRequest, com.electrahub.proto.payment.v1.ListCardsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListCards"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.ListCardsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.ListCardsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("ListCards"))
              .build();
        }
      }
    }
    return getListCardsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.AddCardRequest,
      com.electrahub.proto.payment.v1.PaymentCard> getAddCardMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AddCard",
      requestType = com.electrahub.proto.payment.v1.AddCardRequest.class,
      responseType = com.electrahub.proto.payment.v1.PaymentCard.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.AddCardRequest,
      com.electrahub.proto.payment.v1.PaymentCard> getAddCardMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.AddCardRequest, com.electrahub.proto.payment.v1.PaymentCard> getAddCardMethod;
    if ((getAddCardMethod = PaymentServiceGrpc.getAddCardMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getAddCardMethod = PaymentServiceGrpc.getAddCardMethod) == null) {
          PaymentServiceGrpc.getAddCardMethod = getAddCardMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.AddCardRequest, com.electrahub.proto.payment.v1.PaymentCard>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "AddCard"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.AddCardRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.PaymentCard.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("AddCard"))
              .build();
        }
      }
    }
    return getAddCardMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.DeleteCardRequest,
      com.electrahub.proto.payment.v1.DeleteCardResponse> getDeleteCardMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "DeleteCard",
      requestType = com.electrahub.proto.payment.v1.DeleteCardRequest.class,
      responseType = com.electrahub.proto.payment.v1.DeleteCardResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.DeleteCardRequest,
      com.electrahub.proto.payment.v1.DeleteCardResponse> getDeleteCardMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.DeleteCardRequest, com.electrahub.proto.payment.v1.DeleteCardResponse> getDeleteCardMethod;
    if ((getDeleteCardMethod = PaymentServiceGrpc.getDeleteCardMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getDeleteCardMethod = PaymentServiceGrpc.getDeleteCardMethod) == null) {
          PaymentServiceGrpc.getDeleteCardMethod = getDeleteCardMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.DeleteCardRequest, com.electrahub.proto.payment.v1.DeleteCardResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "DeleteCard"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.DeleteCardRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.DeleteCardResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("DeleteCard"))
              .build();
        }
      }
    }
    return getDeleteCardMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest,
      com.electrahub.proto.payment.v1.AutoTopUpConfig> getGetAutoTopUpConfigMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetAutoTopUpConfig",
      requestType = com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest.class,
      responseType = com.electrahub.proto.payment.v1.AutoTopUpConfig.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest,
      com.electrahub.proto.payment.v1.AutoTopUpConfig> getGetAutoTopUpConfigMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest, com.electrahub.proto.payment.v1.AutoTopUpConfig> getGetAutoTopUpConfigMethod;
    if ((getGetAutoTopUpConfigMethod = PaymentServiceGrpc.getGetAutoTopUpConfigMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getGetAutoTopUpConfigMethod = PaymentServiceGrpc.getGetAutoTopUpConfigMethod) == null) {
          PaymentServiceGrpc.getGetAutoTopUpConfigMethod = getGetAutoTopUpConfigMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest, com.electrahub.proto.payment.v1.AutoTopUpConfig>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetAutoTopUpConfig"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.AutoTopUpConfig.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("GetAutoTopUpConfig"))
              .build();
        }
      }
    }
    return getGetAutoTopUpConfigMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest,
      com.electrahub.proto.payment.v1.AutoTopUpConfig> getUpdateAutoTopUpConfigMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "UpdateAutoTopUpConfig",
      requestType = com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest.class,
      responseType = com.electrahub.proto.payment.v1.AutoTopUpConfig.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest,
      com.electrahub.proto.payment.v1.AutoTopUpConfig> getUpdateAutoTopUpConfigMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest, com.electrahub.proto.payment.v1.AutoTopUpConfig> getUpdateAutoTopUpConfigMethod;
    if ((getUpdateAutoTopUpConfigMethod = PaymentServiceGrpc.getUpdateAutoTopUpConfigMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getUpdateAutoTopUpConfigMethod = PaymentServiceGrpc.getUpdateAutoTopUpConfigMethod) == null) {
          PaymentServiceGrpc.getUpdateAutoTopUpConfigMethod = getUpdateAutoTopUpConfigMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest, com.electrahub.proto.payment.v1.AutoTopUpConfig>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "UpdateAutoTopUpConfig"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.AutoTopUpConfig.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("UpdateAutoTopUpConfig"))
              .build();
        }
      }
    }
    return getUpdateAutoTopUpConfigMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.ReloadPaymentStateRequest,
      com.electrahub.proto.payment.v1.ReloadResponse> getReloadPaymentStateMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ReloadPaymentState",
      requestType = com.electrahub.proto.payment.v1.ReloadPaymentStateRequest.class,
      responseType = com.electrahub.proto.payment.v1.ReloadResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.ReloadPaymentStateRequest,
      com.electrahub.proto.payment.v1.ReloadResponse> getReloadPaymentStateMethod() {
    io.grpc.MethodDescriptor<com.electrahub.proto.payment.v1.ReloadPaymentStateRequest, com.electrahub.proto.payment.v1.ReloadResponse> getReloadPaymentStateMethod;
    if ((getReloadPaymentStateMethod = PaymentServiceGrpc.getReloadPaymentStateMethod) == null) {
      synchronized (PaymentServiceGrpc.class) {
        if ((getReloadPaymentStateMethod = PaymentServiceGrpc.getReloadPaymentStateMethod) == null) {
          PaymentServiceGrpc.getReloadPaymentStateMethod = getReloadPaymentStateMethod =
              io.grpc.MethodDescriptor.<com.electrahub.proto.payment.v1.ReloadPaymentStateRequest, com.electrahub.proto.payment.v1.ReloadResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ReloadPaymentState"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.ReloadPaymentStateRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.electrahub.proto.payment.v1.ReloadResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PaymentServiceMethodDescriptorSupplier("ReloadPaymentState"))
              .build();
        }
      }
    }
    return getReloadPaymentStateMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static PaymentServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PaymentServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PaymentServiceStub>() {
        @java.lang.Override
        public PaymentServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PaymentServiceStub(channel, callOptions);
        }
      };
    return PaymentServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static PaymentServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PaymentServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PaymentServiceBlockingStub>() {
        @java.lang.Override
        public PaymentServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PaymentServiceBlockingStub(channel, callOptions);
        }
      };
    return PaymentServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static PaymentServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PaymentServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PaymentServiceFutureStub>() {
        @java.lang.Override
        public PaymentServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PaymentServiceFutureStub(channel, callOptions);
        }
      };
    return PaymentServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     * <pre>
     * Internal: provision a wallet account for a new user
     * </pre>
     */
    default void createWalletAccount(com.electrahub.proto.payment.v1.CreateWalletAccountRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.CreateWalletAccountResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateWalletAccountMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get full payment state (wallet + cards + auto-topup + recent topups)
     * </pre>
     */
    default void getPaymentState(com.electrahub.proto.payment.v1.GetPaymentStateRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.PaymentStateResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetPaymentStateMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get wallet balance and details
     * </pre>
     */
    default void getWallet(com.electrahub.proto.payment.v1.GetWalletRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.WalletStateResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetWalletMethod(), responseObserver);
    }

    /**
     * <pre>
     * List wallet top-ups
     * </pre>
     */
    default void listTopUps(com.electrahub.proto.payment.v1.ListTopUpsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.ListTopUpsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListTopUpsMethod(), responseObserver);
    }

    /**
     * <pre>
     * Add a manual or auto top-up to wallet
     * </pre>
     */
    default void addTopUp(com.electrahub.proto.payment.v1.AddTopUpRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.TopUpCreatedResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAddTopUpMethod(), responseObserver);
    }

    /**
     * <pre>
     * List payment cards
     * </pre>
     */
    default void listCards(com.electrahub.proto.payment.v1.ListCardsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.ListCardsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListCardsMethod(), responseObserver);
    }

    /**
     * <pre>
     * Add a payment card
     * </pre>
     */
    default void addCard(com.electrahub.proto.payment.v1.AddCardRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.PaymentCard> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAddCardMethod(), responseObserver);
    }

    /**
     * <pre>
     * Delete a payment card
     * </pre>
     */
    default void deleteCard(com.electrahub.proto.payment.v1.DeleteCardRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.DeleteCardResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getDeleteCardMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get auto top-up configuration
     * </pre>
     */
    default void getAutoTopUpConfig(com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.AutoTopUpConfig> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetAutoTopUpConfigMethod(), responseObserver);
    }

    /**
     * <pre>
     * Update auto top-up configuration
     * </pre>
     */
    default void updateAutoTopUpConfig(com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.AutoTopUpConfig> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getUpdateAutoTopUpConfigMethod(), responseObserver);
    }

    /**
     * <pre>
     * Reload payment state (sync + apply auto-topup if needed)
     * </pre>
     */
    default void reloadPaymentState(com.electrahub.proto.payment.v1.ReloadPaymentStateRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.ReloadResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getReloadPaymentStateMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service PaymentService.
   */
  public static abstract class PaymentServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return PaymentServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service PaymentService.
   */
  public static final class PaymentServiceStub
      extends io.grpc.stub.AbstractAsyncStub<PaymentServiceStub> {
    private PaymentServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PaymentServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PaymentServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     * Internal: provision a wallet account for a new user
     * </pre>
     */
    public void createWalletAccount(com.electrahub.proto.payment.v1.CreateWalletAccountRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.CreateWalletAccountResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateWalletAccountMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get full payment state (wallet + cards + auto-topup + recent topups)
     * </pre>
     */
    public void getPaymentState(com.electrahub.proto.payment.v1.GetPaymentStateRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.PaymentStateResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetPaymentStateMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get wallet balance and details
     * </pre>
     */
    public void getWallet(com.electrahub.proto.payment.v1.GetWalletRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.WalletStateResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetWalletMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * List wallet top-ups
     * </pre>
     */
    public void listTopUps(com.electrahub.proto.payment.v1.ListTopUpsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.ListTopUpsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListTopUpsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Add a manual or auto top-up to wallet
     * </pre>
     */
    public void addTopUp(com.electrahub.proto.payment.v1.AddTopUpRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.TopUpCreatedResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAddTopUpMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * List payment cards
     * </pre>
     */
    public void listCards(com.electrahub.proto.payment.v1.ListCardsRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.ListCardsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListCardsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Add a payment card
     * </pre>
     */
    public void addCard(com.electrahub.proto.payment.v1.AddCardRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.PaymentCard> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAddCardMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Delete a payment card
     * </pre>
     */
    public void deleteCard(com.electrahub.proto.payment.v1.DeleteCardRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.DeleteCardResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getDeleteCardMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get auto top-up configuration
     * </pre>
     */
    public void getAutoTopUpConfig(com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.AutoTopUpConfig> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetAutoTopUpConfigMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Update auto top-up configuration
     * </pre>
     */
    public void updateAutoTopUpConfig(com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.AutoTopUpConfig> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getUpdateAutoTopUpConfigMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Reload payment state (sync + apply auto-topup if needed)
     * </pre>
     */
    public void reloadPaymentState(com.electrahub.proto.payment.v1.ReloadPaymentStateRequest request,
        io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.ReloadResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getReloadPaymentStateMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service PaymentService.
   */
  public static final class PaymentServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<PaymentServiceBlockingStub> {
    private PaymentServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PaymentServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PaymentServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Internal: provision a wallet account for a new user
     * </pre>
     */
    public com.electrahub.proto.payment.v1.CreateWalletAccountResponse createWalletAccount(com.electrahub.proto.payment.v1.CreateWalletAccountRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateWalletAccountMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get full payment state (wallet + cards + auto-topup + recent topups)
     * </pre>
     */
    public com.electrahub.proto.payment.v1.PaymentStateResponse getPaymentState(com.electrahub.proto.payment.v1.GetPaymentStateRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetPaymentStateMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get wallet balance and details
     * </pre>
     */
    public com.electrahub.proto.payment.v1.WalletStateResponse getWallet(com.electrahub.proto.payment.v1.GetWalletRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetWalletMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * List wallet top-ups
     * </pre>
     */
    public com.electrahub.proto.payment.v1.ListTopUpsResponse listTopUps(com.electrahub.proto.payment.v1.ListTopUpsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListTopUpsMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Add a manual or auto top-up to wallet
     * </pre>
     */
    public com.electrahub.proto.payment.v1.TopUpCreatedResponse addTopUp(com.electrahub.proto.payment.v1.AddTopUpRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAddTopUpMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * List payment cards
     * </pre>
     */
    public com.electrahub.proto.payment.v1.ListCardsResponse listCards(com.electrahub.proto.payment.v1.ListCardsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListCardsMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Add a payment card
     * </pre>
     */
    public com.electrahub.proto.payment.v1.PaymentCard addCard(com.electrahub.proto.payment.v1.AddCardRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAddCardMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Delete a payment card
     * </pre>
     */
    public com.electrahub.proto.payment.v1.DeleteCardResponse deleteCard(com.electrahub.proto.payment.v1.DeleteCardRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getDeleteCardMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get auto top-up configuration
     * </pre>
     */
    public com.electrahub.proto.payment.v1.AutoTopUpConfig getAutoTopUpConfig(com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetAutoTopUpConfigMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Update auto top-up configuration
     * </pre>
     */
    public com.electrahub.proto.payment.v1.AutoTopUpConfig updateAutoTopUpConfig(com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getUpdateAutoTopUpConfigMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Reload payment state (sync + apply auto-topup if needed)
     * </pre>
     */
    public com.electrahub.proto.payment.v1.ReloadResponse reloadPaymentState(com.electrahub.proto.payment.v1.ReloadPaymentStateRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getReloadPaymentStateMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service PaymentService.
   */
  public static final class PaymentServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<PaymentServiceFutureStub> {
    private PaymentServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PaymentServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PaymentServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Internal: provision a wallet account for a new user
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.CreateWalletAccountResponse> createWalletAccount(
        com.electrahub.proto.payment.v1.CreateWalletAccountRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateWalletAccountMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get full payment state (wallet + cards + auto-topup + recent topups)
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.PaymentStateResponse> getPaymentState(
        com.electrahub.proto.payment.v1.GetPaymentStateRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetPaymentStateMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get wallet balance and details
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.WalletStateResponse> getWallet(
        com.electrahub.proto.payment.v1.GetWalletRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetWalletMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * List wallet top-ups
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.ListTopUpsResponse> listTopUps(
        com.electrahub.proto.payment.v1.ListTopUpsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListTopUpsMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Add a manual or auto top-up to wallet
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.TopUpCreatedResponse> addTopUp(
        com.electrahub.proto.payment.v1.AddTopUpRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAddTopUpMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * List payment cards
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.ListCardsResponse> listCards(
        com.electrahub.proto.payment.v1.ListCardsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListCardsMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Add a payment card
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.PaymentCard> addCard(
        com.electrahub.proto.payment.v1.AddCardRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAddCardMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Delete a payment card
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.DeleteCardResponse> deleteCard(
        com.electrahub.proto.payment.v1.DeleteCardRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getDeleteCardMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get auto top-up configuration
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.AutoTopUpConfig> getAutoTopUpConfig(
        com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetAutoTopUpConfigMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Update auto top-up configuration
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.AutoTopUpConfig> updateAutoTopUpConfig(
        com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getUpdateAutoTopUpConfigMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Reload payment state (sync + apply auto-topup if needed)
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.electrahub.proto.payment.v1.ReloadResponse> reloadPaymentState(
        com.electrahub.proto.payment.v1.ReloadPaymentStateRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getReloadPaymentStateMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CREATE_WALLET_ACCOUNT = 0;
  private static final int METHODID_GET_PAYMENT_STATE = 1;
  private static final int METHODID_GET_WALLET = 2;
  private static final int METHODID_LIST_TOP_UPS = 3;
  private static final int METHODID_ADD_TOP_UP = 4;
  private static final int METHODID_LIST_CARDS = 5;
  private static final int METHODID_ADD_CARD = 6;
  private static final int METHODID_DELETE_CARD = 7;
  private static final int METHODID_GET_AUTO_TOP_UP_CONFIG = 8;
  private static final int METHODID_UPDATE_AUTO_TOP_UP_CONFIG = 9;
  private static final int METHODID_RELOAD_PAYMENT_STATE = 10;

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
        case METHODID_CREATE_WALLET_ACCOUNT:
          serviceImpl.createWalletAccount((com.electrahub.proto.payment.v1.CreateWalletAccountRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.CreateWalletAccountResponse>) responseObserver);
          break;
        case METHODID_GET_PAYMENT_STATE:
          serviceImpl.getPaymentState((com.electrahub.proto.payment.v1.GetPaymentStateRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.PaymentStateResponse>) responseObserver);
          break;
        case METHODID_GET_WALLET:
          serviceImpl.getWallet((com.electrahub.proto.payment.v1.GetWalletRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.WalletStateResponse>) responseObserver);
          break;
        case METHODID_LIST_TOP_UPS:
          serviceImpl.listTopUps((com.electrahub.proto.payment.v1.ListTopUpsRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.ListTopUpsResponse>) responseObserver);
          break;
        case METHODID_ADD_TOP_UP:
          serviceImpl.addTopUp((com.electrahub.proto.payment.v1.AddTopUpRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.TopUpCreatedResponse>) responseObserver);
          break;
        case METHODID_LIST_CARDS:
          serviceImpl.listCards((com.electrahub.proto.payment.v1.ListCardsRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.ListCardsResponse>) responseObserver);
          break;
        case METHODID_ADD_CARD:
          serviceImpl.addCard((com.electrahub.proto.payment.v1.AddCardRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.PaymentCard>) responseObserver);
          break;
        case METHODID_DELETE_CARD:
          serviceImpl.deleteCard((com.electrahub.proto.payment.v1.DeleteCardRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.DeleteCardResponse>) responseObserver);
          break;
        case METHODID_GET_AUTO_TOP_UP_CONFIG:
          serviceImpl.getAutoTopUpConfig((com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.AutoTopUpConfig>) responseObserver);
          break;
        case METHODID_UPDATE_AUTO_TOP_UP_CONFIG:
          serviceImpl.updateAutoTopUpConfig((com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.AutoTopUpConfig>) responseObserver);
          break;
        case METHODID_RELOAD_PAYMENT_STATE:
          serviceImpl.reloadPaymentState((com.electrahub.proto.payment.v1.ReloadPaymentStateRequest) request,
              (io.grpc.stub.StreamObserver<com.electrahub.proto.payment.v1.ReloadResponse>) responseObserver);
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
          getCreateWalletAccountMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.CreateWalletAccountRequest,
              com.electrahub.proto.payment.v1.CreateWalletAccountResponse>(
                service, METHODID_CREATE_WALLET_ACCOUNT)))
        .addMethod(
          getGetPaymentStateMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.GetPaymentStateRequest,
              com.electrahub.proto.payment.v1.PaymentStateResponse>(
                service, METHODID_GET_PAYMENT_STATE)))
        .addMethod(
          getGetWalletMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.GetWalletRequest,
              com.electrahub.proto.payment.v1.WalletStateResponse>(
                service, METHODID_GET_WALLET)))
        .addMethod(
          getListTopUpsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.ListTopUpsRequest,
              com.electrahub.proto.payment.v1.ListTopUpsResponse>(
                service, METHODID_LIST_TOP_UPS)))
        .addMethod(
          getAddTopUpMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.AddTopUpRequest,
              com.electrahub.proto.payment.v1.TopUpCreatedResponse>(
                service, METHODID_ADD_TOP_UP)))
        .addMethod(
          getListCardsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.ListCardsRequest,
              com.electrahub.proto.payment.v1.ListCardsResponse>(
                service, METHODID_LIST_CARDS)))
        .addMethod(
          getAddCardMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.AddCardRequest,
              com.electrahub.proto.payment.v1.PaymentCard>(
                service, METHODID_ADD_CARD)))
        .addMethod(
          getDeleteCardMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.DeleteCardRequest,
              com.electrahub.proto.payment.v1.DeleteCardResponse>(
                service, METHODID_DELETE_CARD)))
        .addMethod(
          getGetAutoTopUpConfigMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.GetAutoTopUpConfigRequest,
              com.electrahub.proto.payment.v1.AutoTopUpConfig>(
                service, METHODID_GET_AUTO_TOP_UP_CONFIG)))
        .addMethod(
          getUpdateAutoTopUpConfigMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.UpdateAutoTopUpConfigRequest,
              com.electrahub.proto.payment.v1.AutoTopUpConfig>(
                service, METHODID_UPDATE_AUTO_TOP_UP_CONFIG)))
        .addMethod(
          getReloadPaymentStateMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.electrahub.proto.payment.v1.ReloadPaymentStateRequest,
              com.electrahub.proto.payment.v1.ReloadResponse>(
                service, METHODID_RELOAD_PAYMENT_STATE)))
        .build();
  }

  private static abstract class PaymentServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    PaymentServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.electrahub.proto.payment.v1.PaymentProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("PaymentService");
    }
  }

  private static final class PaymentServiceFileDescriptorSupplier
      extends PaymentServiceBaseDescriptorSupplier {
    PaymentServiceFileDescriptorSupplier() {}
  }

  private static final class PaymentServiceMethodDescriptorSupplier
      extends PaymentServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    PaymentServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (PaymentServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new PaymentServiceFileDescriptorSupplier())
              .addMethod(getCreateWalletAccountMethod())
              .addMethod(getGetPaymentStateMethod())
              .addMethod(getGetWalletMethod())
              .addMethod(getListTopUpsMethod())
              .addMethod(getAddTopUpMethod())
              .addMethod(getListCardsMethod())
              .addMethod(getAddCardMethod())
              .addMethod(getDeleteCardMethod())
              .addMethod(getGetAutoTopUpConfigMethod())
              .addMethod(getUpdateAutoTopUpConfigMethod())
              .addMethod(getReloadPaymentStateMethod())
              .build();
        }
      }
    }
    return result;
  }
}
