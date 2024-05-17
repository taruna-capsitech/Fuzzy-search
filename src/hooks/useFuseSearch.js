import React, { useCallback, useMemo } from "react";
import Fuse from 'fuse.js';

const useFuseSearch = ({ initialOptions }) => {
    const [ query, setQuery ] = React.useState();

    const document = useMemo(() => {
        if(!initialOptions) return null;
        const options = {
            keys: ["name", "synonyms", "code", "type", "group", "nature"],
            includeScore: true
        };
        return new Fuse(initialOptions, options);
    }, [initialOptions])

    const result = useMemo(() => {
        if(query)  return document.search(query);
    }, [document, query])

    const onFuseSearch = useCallback((e) => setQuery(e !== "" ? e : "a"), []);
    const fuseResult = result?.sort((a, b) => a.item.id - b.item.id);

    return {
        fuseResult,
        onFuseSearch,
        setQuery,
        query
    }
}
export default useFuseSearch;