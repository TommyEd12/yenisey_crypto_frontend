import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { backendInstance } from "@/http";
import Token from "@/types";

interface CryptoDataTableProps {
  firstDate: Date;
  secondDate: Date;
}

export const CryptoDataTable = () => {
  const [Tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await backendInstance.get("/Top");
        const newTokens: Token[] = response.data;
        setTokens(newTokens);
      } catch (e: any) {
        console.error("Failed to fetch tokens:", e);
        setError("Failed to load tokens. Please try again later.");
        if (e.code === "ECONNABORTED") {
          // Axios timeout error code
          setError(
            "Request timed out. Please check your connection or try again later."
          );
        } else if (e.response) {
          setError(
            `Failed to load tokens. Server returned ${e.response.status}: ${e.response.statusText}`
          );
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading tokens...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Table className="table-fixed">
      <TableCaption>Список токенов по объему.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Номер</TableHead>
          <TableHead>Токен</TableHead>
          <TableHead className="">Изменение объема в процентах</TableHead>
          <TableHead className="text-right">Объем валюты $</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Tokens.map((token, index) => (
          <TableRow key={token.name}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{token.name}</TableCell>
            <TableCell>{token.price.volDiff1}</TableCell>
            <TableCell>{token.volume}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
