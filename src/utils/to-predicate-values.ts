type Predicator = (value: unknown) => unknown;
type ObjectComparator = (value: unknown) => boolean;

interface Options {
  objectComparator?: ObjectComparator;
  maxDepth?: number;
}

export default function toPredicateValues<T = unknown>(
  data: T,
  predicator: Predicator,
  options: Options = {},
): T {
  const {
    objectComparator = (value: unknown) => typeof value === 'object' && value !== null,
    maxDepth = 10,
  } = options;

  // 处理边界条件
  if (data === null || data === undefined) {
    return data;
  }

  // 防止无限递归
  if (maxDepth <= 0) {
    return predicator(data) as T;
  }

  // 处理数组
  if (Array.isArray(data)) {
    return data.map((item) =>
      toPredicateValues(item, predicator, { ...options, maxDepth: maxDepth - 1 }),
    ) as T;
  }

  // 处理对象
  if (objectComparator(data)) {
    const result: Record<string, unknown> = {};
    console.log('data', data);

    for (const key of Object.keys(data as Record<string, unknown>)) {
      const value = (data as Record<string, unknown>)[key];
      result[key] = toPredicateValues(value, predicator, { ...options, maxDepth: maxDepth - 1 });
    }
    console.log('result', result);

    return result as T;
  }

  // 处理基本类型
  return predicator(data) as T;
}
