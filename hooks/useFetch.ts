import useSWR, { SWRResponse, SWRConfiguration } from 'swr';
import api from '../demo/service/api';

function useFetch<Data = any, Error = any>(url: string, swrConfiguration?: SWRConfiguration) {
    return useSWR<Data, Error>(
        url,
        async url => (await api.get<Data>(url)).data,
        swrConfiguration,
    ) as SWRResponse<Data>;
}

export { useFetch };
