'use client'

import React, { useEffect, useState } from 'react';
import productData from "./sample/dummy_products.json";
import Link from "next/link";

type productData = {
    id: number;
    name: String;
    price: number;
    description: String;
}

export default function Page() {
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
                            <td><button onClick={handleAddCancel}>キャンセル</button></td>
                            <td><button onClick={handleAdd}>登録する</button></td>
                        </tr>
                    ) : ""}
                    {data.map((data: any) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.price}</td>
                            <td>{data.description}</td>
                            <td><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                            <td>
                                <button>更新・削除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}