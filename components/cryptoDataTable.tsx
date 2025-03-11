"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ } from "lucide-react";
import { backendInstance } from "@/http";
import type Token from "@/types";

interface CryptoDataTableProps {
  firstDate: Date;
  secondDate: Date;
}

export const CryptoDataTable = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSorted, setIsSorted] = useState<boolean>(false);

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

  const sortByVolume = () => {
    let sortedTokens = [...tokens];
    if (isSorted) {
      sortedTokens = [...tokens].sort((a, b) => a.volume - b.volume);
      setIsSorted(false);
    } else {
      sortedTokens = [...tokens].sort((a, b) => b.volume - a.volume);
      setIsSorted(true);
    }

    setTokens(sortedTokens);
  };

  if (loading) {
    return <div className='text-white p-3'>Загрузка токенов...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Table className="table-fixed">
      <TableCaption className="mb-1">Список токенов по объему</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Номер</TableHead>
          <TableHead>Токен</TableHead>
          <TableHead className="">Изменение объема в процентах</TableHead>
          <TableHead className="text-right">
            <div className="flex items-center justify-end gap-2">
              Объем валюты $
              <Button
                variant="ghost"
                size="sm"
                onClick={sortByVolume}
                className="ml-2 h-8 w-8 p-0"
                title="Сортировать по объему"
              >
                <ArrowDownAZ className="h-4 w-4" />
                <span className="sr-only">Сортировать по объему</span>
              </Button>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((token, index) => (
          <TableRow key={token.name}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{token.name}</TableCell>
            <TableCell>{token.price.volDiff1}</TableCell>
            <TableCell className="text-right">{token.cap}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
