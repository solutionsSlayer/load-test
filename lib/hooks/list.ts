/* eslint-disable */
import type { Prisma } from ".zenstack/models";
import { type GetNextArgs, type QueryOptions, type InfiniteQueryOptions, type MutationOptions, type PickEnumerable } from '@zenstackhq/swr/runtime';
import metadata from './__model_meta';
import * as request from '@zenstackhq/swr/runtime';

export function useCreateList(options?: MutationOptions<Prisma.ListGetPayload<Prisma.ListCreateArgs> | undefined, unknown, Prisma.ListCreateArgs>) {
    const mutation = request.useModelMutation('List', 'POST', 'create', metadata, options, true);
    return {
        ...mutation,
        trigger: <T extends Prisma.ListCreateArgs>(args: Prisma.SelectSubset<T, Prisma.ListCreateArgs>) => {
            return mutation.trigger(args, options as any) as Promise<Prisma.ListGetPayload<T> | undefined>;
        }
    };
}

export function useCreateManyList(options?: MutationOptions<Prisma.BatchPayload, unknown, Prisma.ListCreateManyArgs>) {
    const mutation = request.useModelMutation('List', 'POST', 'createMany', metadata, options, false);
    return {
        ...mutation,
        trigger: <T extends Prisma.ListCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.ListCreateManyArgs>) => {
            return mutation.trigger(args, options as any) as Promise<Prisma.BatchPayload>;
        }
    };
}

export function useFindManyList<T extends Prisma.ListFindManyArgs>(args?: Prisma.SelectSubset<T, Prisma.ListFindManyArgs>, options?: QueryOptions<Array<Prisma.ListGetPayload<T> & { $optimistic?: boolean }>>) {
    return request.useModelQuery('List', 'findMany', args, options);
}

export function useInfiniteFindManyList<T extends Prisma.ListFindManyArgs, R extends Array<Prisma.ListGetPayload<T>>>(getNextArgs: GetNextArgs<Prisma.SelectSubset<T, Prisma.ListFindManyArgs> | undefined, R>, options?: InfiniteQueryOptions<Array<Prisma.ListGetPayload<T>>>) {
    return request.useInfiniteModelQuery('List', 'findMany', getNextArgs, options);
}

export function useFindUniqueList<T extends Prisma.ListFindUniqueArgs>(args?: Prisma.SelectSubset<T, Prisma.ListFindUniqueArgs>, options?: QueryOptions<Prisma.ListGetPayload<T> & { $optimistic?: boolean }>) {
    return request.useModelQuery('List', 'findUnique', args, options);
}

export function useFindFirstList<T extends Prisma.ListFindFirstArgs>(args?: Prisma.SelectSubset<T, Prisma.ListFindFirstArgs>, options?: QueryOptions<Prisma.ListGetPayload<T> & { $optimistic?: boolean }>) {
    return request.useModelQuery('List', 'findFirst', args, options);
}

export function useUpdateList(options?: MutationOptions<Prisma.ListGetPayload<Prisma.ListUpdateArgs> | undefined, unknown, Prisma.ListUpdateArgs>) {
    const mutation = request.useModelMutation('List', 'PUT', 'update', metadata, options, true);
    return {
        ...mutation,
        trigger: <T extends Prisma.ListUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.ListUpdateArgs>) => {
            return mutation.trigger(args, options as any) as Promise<Prisma.ListGetPayload<T> | undefined>;
        }
    };
}

export function useUpdateManyList(options?: MutationOptions<Prisma.BatchPayload, unknown, Prisma.ListUpdateManyArgs>) {
    const mutation = request.useModelMutation('List', 'PUT', 'updateMany', metadata, options, false);
    return {
        ...mutation,
        trigger: <T extends Prisma.ListUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.ListUpdateManyArgs>) => {
            return mutation.trigger(args, options as any) as Promise<Prisma.BatchPayload>;
        }
    };
}

export function useUpsertList(options?: MutationOptions<Prisma.ListGetPayload<Prisma.ListUpsertArgs> | undefined, unknown, Prisma.ListUpsertArgs>) {
    const mutation = request.useModelMutation('List', 'POST', 'upsert', metadata, options, true);
    return {
        ...mutation,
        trigger: <T extends Prisma.ListUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.ListUpsertArgs>) => {
            return mutation.trigger(args, options as any) as Promise<Prisma.ListGetPayload<T> | undefined>;
        }
    };
}

export function useDeleteList(options?: MutationOptions<Prisma.ListGetPayload<Prisma.ListDeleteArgs> | undefined, unknown, Prisma.ListDeleteArgs>) {
    const mutation = request.useModelMutation('List', 'DELETE', 'delete', metadata, options, true);
    return {
        ...mutation,
        trigger: <T extends Prisma.ListDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.ListDeleteArgs>) => {
            return mutation.trigger(args, options as any) as Promise<Prisma.ListGetPayload<T> | undefined>;
        }
    };
}

export function useDeleteManyList(options?: MutationOptions<Prisma.BatchPayload, unknown, Prisma.ListDeleteManyArgs>) {
    const mutation = request.useModelMutation('List', 'DELETE', 'deleteMany', metadata, options, false);
    return {
        ...mutation,
        trigger: <T extends Prisma.ListDeleteManyArgs>(args: Prisma.SelectSubset<T, Prisma.ListDeleteManyArgs>) => {
            return mutation.trigger(args, options as any) as Promise<Prisma.BatchPayload>;
        }
    };
}

export function useAggregateList<T extends Prisma.ListAggregateArgs>(args?: Prisma.Subset<T, Prisma.ListAggregateArgs>, options?: QueryOptions<Prisma.GetListAggregateType<T>>) {
    return request.useModelQuery('List', 'aggregate', args, options);
}

export function useGroupByList<T extends Prisma.ListGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.ListGroupByArgs['orderBy'] } : { orderBy?: Prisma.ListGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]>(args?: Prisma.SubsetIntersection<T, Prisma.ListGroupByArgs, OrderByArg> & InputErrors, options?: QueryOptions<{} extends InputErrors ?
        Array<PickEnumerable<Prisma.ListGroupByOutputType, T['by']> &
            {
                [P in ((keyof T) & (keyof Prisma.ListGroupByOutputType))]: P extends '_count'
                ? T[P] extends boolean
                ? number
                : Prisma.GetScalarType<T[P], Prisma.ListGroupByOutputType[P]>
                : Prisma.GetScalarType<T[P], Prisma.ListGroupByOutputType[P]>
            }
        > : InputErrors>) {
    return request.useModelQuery('List', 'groupBy', args, options);
}

export function useCountList<T extends Prisma.ListCountArgs>(args?: Prisma.Subset<T, Prisma.ListCountArgs>, options?: QueryOptions<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.ListCountAggregateOutputType> : number>) {
    return request.useModelQuery('List', 'count', args, options);
}
