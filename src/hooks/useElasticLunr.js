import React, { useMemo, useCallback } from 'react';
import elasticlunr from 'elasticlunr';

const useElasticLunrSearch = ({initialOptions}) => {
    const [query, setQuery] = React.useState();

    const document = useMemo(() => {
        if(!initialOptions) return null;

        const index = elasticlunr();
        
        if(index){
            index.setRef('id');
            index.addField('code');
            index.addField('name');
            index.addField('group');
            index.addField('type');
            index.addField('synonyms');
        }

        initialOptions?.forEach(item => {
            index.addDoc({
                id: item.id,
                code: item.code,
                name: item.name,
                group: item.group,
                type: item.type,
                synonyms: item.synonyms
            });
        });

        return index;
    }, [initialOptions])

    const result = useMemo(() => {
        if(query && initialOptions && initialOptions?.length > 0)  return document.search(query, { expand: true }).map(({ ref }) => (initialOptions.find((item) => (item.id === parseInt(ref)))));
        else return [];
    }, [document, initialOptions, query])

    const onElasticLunrSearch = useCallback((e) => setQuery(e !== "" ? e : "s"), []);

    const elasticlunrResult = result?.sort((a, b) => a.id - b.id);

    return {
        elasticlunrResult,
        query,
        setQuery,
        onElasticLunrSearch
    }
}
export default useElasticLunrSearch;