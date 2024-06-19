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
        index: ["id", "combined"],
        store: ["id", "name", "code", "group", "type", "nature", "synonyms", "combined"],
      },
    });

    if(initialOptions && initialOptions?.length > 0){
      for(const item of initialOptions){
        index.add({ 
          id: item?.id, 
          name: item?.name, 
          code: item?.code, 
          group: item?.group, 
          type: item?.type, 
          nature: item?.nature, 
          synonyms: item.synonyms && item?.synonyms?.length > 0 ? item.synonyms.join(' ') : "",
          combined: item?.name + ", " + (item.synonyms && item?.synonyms?.length > 0 ? item.synonyms.join(' ') : " ") + ", " + item?.code + ", " + item?.type + ", " + item?.group + ", " + item?.nature
        })
      }
    }
    return index;
  }, [initialOptions]);

  const result = useMemo(() => {
    const results = [];
    if(query) results.push(...document.search(query, { pluck: ["combined"], limit: limit || 15, fuzzy: 2, enrich: true })); 
    return results;
  }, [query, document, limit]);

  const onSearch = useCallback((e) => setQuery(e !== "" ? e : "a"), []);

  const flexResult = useMemo(() => {
    if (result.length === 0) return [];

    let groupedResult = result?.reduce((acc, {id, doc}) => {
      let grouplabel = doc?.group;
      if(!acc[grouplabel]) acc[grouplabel] = [];
      acc[grouplabel]?.push({ value: id, label: `${doc?.name} - ${doc?.code}`, synonyms: doc?.synonyms && doc?.synonyms?.length > 0 ? doc?.synonyms : '' });
      return acc;
    }, {});

    return Object.keys(groupedResult)?.map(group => ({
      label: group,
      options: groupedResult[group]?.sort((a, b) => a?.value - b?.value)
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
