'use client'

import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import productData from "./sample/dummy_products.json";
import Link from "next/link";

type productData = {
    id: number | null;
    name: String;
    price: number;
    description: String;
}

export default function Page() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    //読み込みデータ保持
    const [data, setData] = useState<Array<productData>>([]);

    useEffect(() => {
        setData(productData);
    }, [])
    const [shownNewShow, setShownNewShow] = useState(false);
    const handleShowNewRow = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShownNewShow(true);
    }
    const handleAddCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShownNewShow(false);
    }
    const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        //バックエンドを使用した登録処理を呼ぶ
        setShownNewShow(false);
    }
    const [editingRow, setEditingRow] = useState(0);
    const handleEditRow: any = (id: number) => {
        setShownNewShow(false)
        setEditingRow(id)
    };
    const handleEditCancel: any = (id: number) => {
        setEditingRow(0)
    }
    const handleEditDelete: any = (id: number) =>
        setEditingRow(0)
        ;

    return (
        <>
            <h2>商品一覧</h2>
            <button onClick={handleShowNewRow}>商品を追加する</button>
            <table>
                <thead>
                    <tr>
                        <th>商品ID</th>
                        <th>商品名</th>
                        <th>単価（円）</th>
                        <th>説明</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shownNewShow ? (
                        <tr>
                            <td></td>
                            <td><input type="text" /></td>
                            <td><input type="number" /></td>
                            <td><input type="text" /></td>
                            <td></td>
                            <td><button onClick={(event) => handleAddCancel(event)}>キャンセル</button></td>
                            <td><button onClick={(event) => handleAdd(event)}>登録する</button></td>
                        </tr>
                    ) : ""}
                    {data.map((data: any) => (
                        editingRow === data.id ? (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td><input type="text" defaultValue={data.name} /></td>
                                <td><input type="number" defaultValue={data.price} /></td>
                                <td><input type="text" defaultValue={data.description} /></td>
                                <td></td>
                                <td>
                                    <button onClick={() => handleEditCancel(data.id)}>キャンセル</button>
                                    <button onClick={() => handleEditCancel(data.id)}>更新する</button>
                                    <button onClick={() => handleEditDelete(data.id)}>削除する</button></td>
                            </tr>
                        ) : (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td>{data.description}</td>
                                <td><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                                <td>
                                    <button onClick={() => handleEditRow(data.id)}>更新・削除</button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </>
    )
}