'use client';

import { getAllOrdersUseCase } from "@/src/application/auth/usecases/orders.usecase";
import { Order } from "@/src/core/interfaces/orders/order.interface";
import { useEffect, useState } from "react";

interface UseOrdersOptions {
    autoFetch?: boolean;
}

export function useOrders({ autoFetch = true }: UseOrdersOptions = {}) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(autoFetch);

    const getAllOrders = async () => {
        setLoading(true);
        const response = await getAllOrdersUseCase();

        if (response.isSuccess && response.data) {
            setOrders(response.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (autoFetch) {
            getAllOrders();
        }
    }, [autoFetch]);

    return {
        orders,
        loading,
        getAllOrders,
    };
}