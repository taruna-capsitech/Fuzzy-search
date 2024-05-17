import { Document } from "flexsearch";
import { useCallback, useMemo, useState } from "react";

const useFlexSearch = ({initialOptions, limit}) => {
  const [query, setQuery] = useState();

  const document = useMemo(() => {
    if(!initialOptions) return null;
    const index = new Document({
      tokenize: "full",
      language: "en",
      preset: "match",
      cache: true,
      context: true,
      document: {
        id: "id",
        index: ["id", "name", "code", "group", "type", "nature", "synonyms"],
        store: ["id", "name", "code", "group", "type", "nature", "synonyms"],
      },
    });

    if(initialOptions && initialOptions?.length > 0){
      for(const item of initialOptions){
        index.add({ id: item?.id, name: item?.name, code: item?.code, group: item?.group, type: item?.type, nature: item?.nature, synonyms: item?.synonyms });
      }
    }
    return index;
  }, [initialOptions]);

  const result = useMemo(() => {
    const results = [];
    if(query) results.push(...document.search(query, { pluck: ["name", "code", "group", "type", "nature", "synonyms"], limit: limit || 15, fuzzy: 2, enrich: true })); 
    return results;
  }, [query, document, limit]);

  const onSearch = useCallback((e) => setQuery(e !== "" ? e : "a"), []);

  const flexResult = result?.sort((a, b) => a?.id - b?.id) || [];

  return {
    flexResult,
    query,
    setQuery,
    onSearch,
  };
};

export default useFlexSearch;
