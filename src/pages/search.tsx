import type { NextPage } from "next";
import { useState } from "react";

import { Navbar } from "~/components/Navbar";
import { PageHead } from "~/components/PageHead";
import { Item } from "~/components/item/Item";

import { Input } from "~/components/ui/input";
import { Loader2 } from "lucide-react";

import type { ItemType } from "~/types";
import { api } from "~/utils/api";

const SearchPage: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: itemData, isLoading } = api.item.allItems.useQuery();
  const [searchResults, setSearchResults] = useState<ItemType[]>([]);

  if (isLoading) {
    return (
      <>
        <PageHead title="Search Items | tinofind" />
        <Navbar />

        <main className="w-full pt-4">
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
          <div className="flex justify-center">
            <p className="pt-2 text-sm">Indexing items...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <PageHead title="Search Items | tinofind" />
      <Navbar />

      <main className="w-full pt-4">
        <div className="flex justify-center">
          <div className="w-[45%]">
            <Input
              className="rounded-md border border-slate-200 p-2"
              type="text"
              placeholder="🔍   Search for an item..."
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchResults(
                  itemData!.filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                );
              }}
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[45%]">
            {searchResults.map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </div>
        </div>
        {searchResults.length === 0 && searchQuery.length > 0 && (
          <div className="flex justify-center">
            <p className="pt-4 text-sm text-red-700">No results found.</p>
          </div>
        )}
        {searchQuery.length === 0 && (
          <div className="flex justify-center">
            <p className="pt-4 text-sm">Start typing to search.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default SearchPage;
