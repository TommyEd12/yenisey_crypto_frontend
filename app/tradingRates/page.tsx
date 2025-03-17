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
import { ArrowDownAZ, Search } from "lucide-react";
import { backendInstance } from "@/http";
import { format } from "date-fns";
import { DateTimePicker } from "@/components/ui/date-picker";
import { ru } from "date-fns/locale";
import type { changedToken, opsToken } from "@/types";
import { CustomTooltip } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const Page = () => {
  const [tokens, setTokens] = useState<opsToken[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<opsToken[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setError] = useState<string | null>(null);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [firstDate, setFirstDate] = useState<Date>(
    new Date(Date.now() - 2 * 24 * 60 * 60 * 3)
  );
  const [secondDate, setSecondDate] = useState<Date>(new Date());

  const { isPending, error, data } = useQuery({
    queryKey: ["isAuthenticated"],
    queryFn: async () => {
      const res = await backendInstance.get("/user/profile");
      return res;
    },
  });
  if (isPending) {
    return <h1>Загрузка</h1>;
  }

  if (error) {
    redirect("/login");
  }

  const fetchDataByDateRange = async () => {
    setLoading(true);
    setError(null);

    try {
      const firstDateParam = firstDate.toISOString();
      const secondDateParam = secondDate.toISOString();

      const response = await backendInstance.get(
        `/metrics/topByOperations?firstDate=${firstDateParam}&secondDate=${secondDateParam}`
      );

      const newTokens: opsToken[] = response.data;
      setTokens(newTokens);
      setFilteredTokens(newTokens);
    } catch (e: any) {
      console.error("Failed to fetch tokens by date range:", e);
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

  useEffect(() => {
    fetchDataByDateRange();
  }, []);

  useEffect(() => {
    const filtered = tokens.filter((token) =>
      token.currencyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTokens(filtered);
  }, [searchQuery, tokens]);

  const sortByOperations = () => {
    let sortedTokens = [...filteredTokens];
    if (isSorted) {
      sortedTokens = sortedTokens.sort(
        (a, b) => a.percentageChange - b.percentageChange
      );
      setIsSorted(false);
    } else {
      sortedTokens = sortedTokens.sort(
        (a, b) => b.percentageChange - a.percentageChange
      );
      setIsSorted(true);
    }

    setFilteredTokens(sortedTokens);
  };
  const sortByOverallCountOps = () => {
    let sortedTokens = [...filteredTokens];
    if (isSorted) {
      sortedTokens = sortedTokens.sort((a, b) => a.countOps - b.countOps);
      setIsSorted(false);
    } else {
      sortedTokens = sortedTokens.sort((a, b) => b.countOps - a.countOps);
      setIsSorted(true);
    }

    setFilteredTokens(sortedTokens);
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <main className="m-3 ">
      <div className="space-y-4 mr-4">
        <div className="flex flex-col sm:flex-row gap-3 ml-3 items-end">
          <div className="flex items-center">
            <h1 className="font-bold mb-1 text-xl dark:text-white mr-5 text-nowrap">
              Операции токенов
            </h1>
            <label className="text-sm font-medium text-nowrap dark:text-white mr-3">
              Начальная дата
            </label>
            <DateTimePicker
              selected={firstDate}
              onSelect={setFirstDate}
              locale={ru}
              disabled={loading}
            />
          </div>

          <div className="flex items-center">
            <label className="text-sm text-nowrap font-medium dark:text-white mr-3">
              Конечная дата
            </label>
            <DateTimePicker
              selected={secondDate}
              onSelect={setSecondDate}
              locale={ru}
              disabled={loading}
            />
          </div>

          <Button
            onClick={fetchDataByDateRange}
            disabled={loading}
            variant="outline"
          >
            {loading ? "Загрузка..." : "Применить"}
          </Button>

          <div className="flex items-center ml-auto pr-0">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск токена..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px] text-white "
            />
          </div>
        </div>

        {error && <div className="text-red-500 p-2">{error}</div>}

        {loading ? (
          <div className="text-center p-4">Загрузка токенов...</div>
        ) : (
          <Table className="table-fixed ">
            <TableCaption className="mb-1">
              Список токенов по количеству операций за период{" "}
              {format(firstDate, "dd.MM.yyyy")} -{" "}
              {format(secondDate, "dd.MM.yyyy")}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Номер</TableHead>
                <TableHead>Токен</TableHead>
                <TableHead className="">Контракт</TableHead>
                <TableHead className="flex flex-nowrap text-nowrap items-center">
                  Изменение в процентах{" "}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={sortByOperations}
                    className="ml-2 mt-1 h-8 w-8 p-0 "
                    title="Сортировать по объему"
                  >
                    <ArrowDownAZ className="h-4 w-4" />
                    <span className="sr-only">Сортировать по объему</span>
                  </Button>
                </TableHead>
                <TableHead className="">Изменение операций</TableHead>
                <TableHead className="text-right">
                  {" "}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={sortByOverallCountOps}
                    className="ml-2 mt-1 h-8 w-8 p-0 "
                    title="Сортировать по количеству операций"
                  >
                    <ArrowDownAZ className="h-4 w-4" />
                    <span className="sr-only">
                      Сортировать по количеству операций
                    </span>
                  </Button>{" "}
                  Общее количество{" "}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTokens.length > 0 ? (
                filteredTokens.map((token, index) => (
                  <TableRow key={token.currencyName}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/tokens/${token.contract}`}>
                        {token.currencyName}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      <CustomTooltip content={token.contract}>
                        <span className="cursor-help">
                        {token.contract? shortenAddress(token.contract) : "нет контракта"}
                        </span>
                      </CustomTooltip>
                    </TableCell>
                    <TableCell>
                      {token.percentageChange
                        ? token.percentageChange.toString().slice(0, 5)
                        : "Нет значения"}
                    </TableCell>
                    <TableCell>
                      {token.valueChange ? token.valueChange : "Нет значения"}
                    </TableCell>
                    <TableCell className="text-center">
                      {token.countOps ? token.countOps : "Нет значения"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    {searchQuery
                      ? "Нет результатов поиска"
                      : "Нет данных для выбранного периода"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
};

export default Page;
