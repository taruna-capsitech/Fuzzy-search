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

  const flexResult = useMemo(() => {
    if (result.length === 0) return [];

    let groupedResult = result?.reduce((acc, {id, doc}) => {
      let grouplabel = doc?.group;
      if(!acc[grouplabel]) acc[grouplabel] = [];
      acc[grouplabel]?.push({ value: id, label: doc.name, synonyms: doc?.synonyms && doc?.synonyms?.length > 0 ? doc?.synonyms[0] : '' });
      return acc;
    }, {});

    return Object.keys(groupedResult)?.map(group => ({
      label: group,
      options: groupedResult[group]
    }));
  }, [result]);

  return {
    flexResult,
    query,
    setQuery,
    onSearch,
  };
};

export default useFlexSearch;
