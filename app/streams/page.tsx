"use client";

import type React from "react";

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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { backendInstance } from "@/http";
import type { baseToken } from "@/types";


export const Page = () => {
  const [tokens, setTokens] = useState<baseToken[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newContract, setNewContract] = useState<string>("");
  const [addingToken, setAddingToken] = useState<boolean>(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await backendInstance.get("/metrics/streams");
      const newTokens: baseToken[] = response.data;
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

  const handleAddToken = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newContract.trim()) {
      setAddError("Contract address is required");
      return;
    }

    setAddingToken(true);
    setAddError(null);

    try {
      await backendInstance.post("/operations/addToken", {
        tokenAddress: newContract,
      });

      await fetchTokens();

      setNewContract("");
    } catch (e: any) {
      console.error("Failed to add token:", e);
      if (e.response) {
        setAddError(
          `Failed to add token: ${
            e.response.data.message || e.response.statusText
          }`
        );
      } else {
        setAddError("Failed to add token. Please try again.");
      }
    } finally {
      setAddingToken(false);
    }
  };

  if (loading) {
    return <div className="text-white p-3">Загрузка токенов...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-6 w-11/12 mb-5 mr-5">
      <section className="w-full mt-3 ml-3">
        <Card>
          <CardHeader>
            <CardTitle>Добавить новый токен</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddToken} className=" rounded-2xl space-y-4">
              <div className="">
                <div className="space-y-2 w-full">
                  <label
                    htmlFor="contract-address"
                    className="text-sm font-medium"
                  >
                    Контракт
                  </label>
                  <Input
                    id="contract-address"
                    className="w-full"
                    placeholder="Введите контракт"
                    value={newContract}
                    onChange={(e) => setNewContract(e.target.value)}
                    disabled={addingToken}
                  />
                </div>
              </div>
              {addError && (
                <div className="text-red-500 text-sm">{addError}</div>
              )}
              <Button
                type="submit"
                disabled={addingToken}
                className="w-full sm:w-auto"
              >
                {addingToken ? "Добавление..." : "Добавить токен"}
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <Table className="mr-10 table-fixed ">
        <TableCaption className="mb-1">Все токены</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Номер</TableHead>
            <TableHead>Токен</TableHead>
            <TableHead className="">Контракт</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{token.name}</TableCell>
              <TableCell>{token.contract}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Page;
