
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model Weather
 * 
 */
export type Weather = $Result.DefaultSelection<Prisma.$WeatherPayload>
/**
 * Model Outfit
 * 
 */
export type Outfit = $Result.DefaultSelection<Prisma.$OutfitPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model ItemTag
 * 
 */
export type ItemTag = $Result.DefaultSelection<Prisma.$ItemTagPayload>
/**
 * Model OutfitItem
 * 
 */
export type OutfitItem = $Result.DefaultSelection<Prisma.$OutfitItemPayload>
/**
 * Model OutfitTag
 * 
 */
export type OutfitTag = $Result.DefaultSelection<Prisma.$OutfitTagPayload>
/**
 * Model OutfitLike
 * 
 */
export type OutfitLike = $Result.DefaultSelection<Prisma.$OutfitLikePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weather`: Exposes CRUD operations for the **Weather** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Weathers
    * const weathers = await prisma.weather.findMany()
    * ```
    */
  get weather(): Prisma.WeatherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outfit`: Exposes CRUD operations for the **Outfit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Outfits
    * const outfits = await prisma.outfit.findMany()
    * ```
    */
  get outfit(): Prisma.OutfitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemTag`: Exposes CRUD operations for the **ItemTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemTags
    * const itemTags = await prisma.itemTag.findMany()
    * ```
    */
  get itemTag(): Prisma.ItemTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outfitItem`: Exposes CRUD operations for the **OutfitItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutfitItems
    * const outfitItems = await prisma.outfitItem.findMany()
    * ```
    */
  get outfitItem(): Prisma.OutfitItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outfitTag`: Exposes CRUD operations for the **OutfitTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutfitTags
    * const outfitTags = await prisma.outfitTag.findMany()
    * ```
    */
  get outfitTag(): Prisma.OutfitTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outfitLike`: Exposes CRUD operations for the **OutfitLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutfitLikes
    * const outfitLikes = await prisma.outfitLike.findMany()
    * ```
    */
  get outfitLike(): Prisma.OutfitLikeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Item: 'Item',
    Location: 'Location',
    Weather: 'Weather',
    Outfit: 'Outfit',
    Tag: 'Tag',
    ItemTag: 'ItemTag',
    OutfitItem: 'OutfitItem',
    OutfitTag: 'OutfitTag',
    OutfitLike: 'OutfitLike'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "item" | "location" | "weather" | "outfit" | "tag" | "itemTag" | "outfitItem" | "outfitTag" | "outfitLike"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      Weather: {
        payload: Prisma.$WeatherPayload<ExtArgs>
        fields: Prisma.WeatherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeatherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeatherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherPayload>
          }
          findFirst: {
            args: Prisma.WeatherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeatherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherPayload>
          }
          findMany: {
            args: Prisma.WeatherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherPayload>[]
          }
          create: {
            args: Prisma.WeatherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherPayload>
          }
          createMany: {
            args: Prisma.WeatherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WeatherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherPayload>
          }
          update: {
            args: Prisma.WeatherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherPayload>
          }
          deleteMany: {
            args: Prisma.WeatherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeatherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WeatherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherPayload>
          }
          aggregate: {
            args: Prisma.WeatherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeather>
          }
          groupBy: {
            args: Prisma.WeatherGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeatherGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeatherCountArgs<ExtArgs>
            result: $Utils.Optional<WeatherCountAggregateOutputType> | number
          }
        }
      }
      Outfit: {
        payload: Prisma.$OutfitPayload<ExtArgs>
        fields: Prisma.OutfitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutfitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutfitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          findFirst: {
            args: Prisma.OutfitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutfitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          findMany: {
            args: Prisma.OutfitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>[]
          }
          create: {
            args: Prisma.OutfitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          createMany: {
            args: Prisma.OutfitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OutfitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          update: {
            args: Prisma.OutfitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          deleteMany: {
            args: Prisma.OutfitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutfitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OutfitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitPayload>
          }
          aggregate: {
            args: Prisma.OutfitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutfit>
          }
          groupBy: {
            args: Prisma.OutfitGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutfitGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutfitCountArgs<ExtArgs>
            result: $Utils.Optional<OutfitCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      ItemTag: {
        payload: Prisma.$ItemTagPayload<ExtArgs>
        fields: Prisma.ItemTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemTagPayload>
          }
          findFirst: {
            args: Prisma.ItemTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemTagPayload>
          }
          findMany: {
            args: Prisma.ItemTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemTagPayload>[]
          }
          create: {
            args: Prisma.ItemTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemTagPayload>
          }
          createMany: {
            args: Prisma.ItemTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ItemTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemTagPayload>
          }
          update: {
            args: Prisma.ItemTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemTagPayload>
          }
          deleteMany: {
            args: Prisma.ItemTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemTagPayload>
          }
          aggregate: {
            args: Prisma.ItemTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemTag>
          }
          groupBy: {
            args: Prisma.ItemTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemTagCountArgs<ExtArgs>
            result: $Utils.Optional<ItemTagCountAggregateOutputType> | number
          }
        }
      }
      OutfitItem: {
        payload: Prisma.$OutfitItemPayload<ExtArgs>
        fields: Prisma.OutfitItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutfitItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutfitItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitItemPayload>
          }
          findFirst: {
            args: Prisma.OutfitItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutfitItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitItemPayload>
          }
          findMany: {
            args: Prisma.OutfitItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitItemPayload>[]
          }
          create: {
            args: Prisma.OutfitItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitItemPayload>
          }
          createMany: {
            args: Prisma.OutfitItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OutfitItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitItemPayload>
          }
          update: {
            args: Prisma.OutfitItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitItemPayload>
          }
          deleteMany: {
            args: Prisma.OutfitItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutfitItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OutfitItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitItemPayload>
          }
          aggregate: {
            args: Prisma.OutfitItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutfitItem>
          }
          groupBy: {
            args: Prisma.OutfitItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutfitItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutfitItemCountArgs<ExtArgs>
            result: $Utils.Optional<OutfitItemCountAggregateOutputType> | number
          }
        }
      }
      OutfitTag: {
        payload: Prisma.$OutfitTagPayload<ExtArgs>
        fields: Prisma.OutfitTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutfitTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutfitTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitTagPayload>
          }
          findFirst: {
            args: Prisma.OutfitTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutfitTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitTagPayload>
          }
          findMany: {
            args: Prisma.OutfitTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitTagPayload>[]
          }
          create: {
            args: Prisma.OutfitTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitTagPayload>
          }
          createMany: {
            args: Prisma.OutfitTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OutfitTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitTagPayload>
          }
          update: {
            args: Prisma.OutfitTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitTagPayload>
          }
          deleteMany: {
            args: Prisma.OutfitTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutfitTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OutfitTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitTagPayload>
          }
          aggregate: {
            args: Prisma.OutfitTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutfitTag>
          }
          groupBy: {
            args: Prisma.OutfitTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutfitTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutfitTagCountArgs<ExtArgs>
            result: $Utils.Optional<OutfitTagCountAggregateOutputType> | number
          }
        }
      }
      OutfitLike: {
        payload: Prisma.$OutfitLikePayload<ExtArgs>
        fields: Prisma.OutfitLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutfitLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutfitLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitLikePayload>
          }
          findFirst: {
            args: Prisma.OutfitLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutfitLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitLikePayload>
          }
          findMany: {
            args: Prisma.OutfitLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitLikePayload>[]
          }
          create: {
            args: Prisma.OutfitLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitLikePayload>
          }
          createMany: {
            args: Prisma.OutfitLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OutfitLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitLikePayload>
          }
          update: {
            args: Prisma.OutfitLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitLikePayload>
          }
          deleteMany: {
            args: Prisma.OutfitLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutfitLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OutfitLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutfitLikePayload>
          }
          aggregate: {
            args: Prisma.OutfitLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutfitLike>
          }
          groupBy: {
            args: Prisma.OutfitLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutfitLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutfitLikeCountArgs<ExtArgs>
            result: $Utils.Optional<OutfitLikeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    item?: ItemOmit
    location?: LocationOmit
    weather?: WeatherOmit
    outfit?: OutfitOmit
    tag?: TagOmit
    itemTag?: ItemTagOmit
    outfitItem?: OutfitItemOmit
    outfitTag?: OutfitTagOmit
    outfitLike?: OutfitLikeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    items: number
    outfits: number
    outfitLikes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | UserCountOutputTypeCountItemsArgs
    outfits?: boolean | UserCountOutputTypeCountOutfitsArgs
    outfitLikes?: boolean | UserCountOutputTypeCountOutfitLikesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOutfitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOutfitLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitLikeWhereInput
  }


  /**
   * Count Type ItemCountOutputType
   */

  export type ItemCountOutputType = {
    itemTags: number
    outfitItems: number
  }

  export type ItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemTags?: boolean | ItemCountOutputTypeCountItemTagsArgs
    outfitItems?: boolean | ItemCountOutputTypeCountOutfitItemsArgs
  }

  // Custom InputTypes
  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemCountOutputType
     */
    select?: ItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountItemTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemTagWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountOutfitItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitItemWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    weather: number
    outfits: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    weather?: boolean | LocationCountOutputTypeCountWeatherArgs
    outfits?: boolean | LocationCountOutputTypeCountOutfitsArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountWeatherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeatherWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountOutfitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitWhereInput
  }


  /**
   * Count Type OutfitCountOutputType
   */

  export type OutfitCountOutputType = {
    outfitItems: number
    outfitTags: number
    outfitLikes: number
  }

  export type OutfitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outfitItems?: boolean | OutfitCountOutputTypeCountOutfitItemsArgs
    outfitTags?: boolean | OutfitCountOutputTypeCountOutfitTagsArgs
    outfitLikes?: boolean | OutfitCountOutputTypeCountOutfitLikesArgs
  }

  // Custom InputTypes
  /**
   * OutfitCountOutputType without action
   */
  export type OutfitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitCountOutputType
     */
    select?: OutfitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OutfitCountOutputType without action
   */
  export type OutfitCountOutputTypeCountOutfitItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitItemWhereInput
  }

  /**
   * OutfitCountOutputType without action
   */
  export type OutfitCountOutputTypeCountOutfitTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitTagWhereInput
  }

  /**
   * OutfitCountOutputType without action
   */
  export type OutfitCountOutputTypeCountOutfitLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitLikeWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    itemTags: number
    outfitTags: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemTags?: boolean | TagCountOutputTypeCountItemTagsArgs
    outfitTags?: boolean | TagCountOutputTypeCountOutfitTagsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountItemTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemTagWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountOutfitTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    nickname: string | null
    profileImage: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    nickname: string | null
    profileImage: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    nickname: number
    profileImage: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nickname?: true
    profileImage?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nickname?: true
    profileImage?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nickname?: true
    profileImage?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    nickname: string
    profileImage: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    nickname?: boolean
    profileImage?: boolean
    items?: boolean | User$itemsArgs<ExtArgs>
    outfits?: boolean | User$outfitsArgs<ExtArgs>
    outfitLikes?: boolean | User$outfitLikesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    nickname?: boolean
    profileImage?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "nickname" | "profileImage", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | User$itemsArgs<ExtArgs>
    outfits?: boolean | User$outfitsArgs<ExtArgs>
    outfitLikes?: boolean | User$outfitLikesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      items: Prisma.$ItemPayload<ExtArgs>[]
      outfits: Prisma.$OutfitPayload<ExtArgs>[]
      outfitLikes: Prisma.$OutfitLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      nickname: string
      profileImage: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends User$itemsArgs<ExtArgs> = {}>(args?: Subset<T, User$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    outfits<T extends User$outfitsArgs<ExtArgs> = {}>(args?: Subset<T, User$outfitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    outfitLikes<T extends User$outfitLikesArgs<ExtArgs> = {}>(args?: Subset<T, User$outfitLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly nickname: FieldRef<"User", 'String'>
    readonly profileImage: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.items
   */
  export type User$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * User.outfits
   */
  export type User$outfitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    where?: OutfitWhereInput
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    cursor?: OutfitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitScalarFieldEnum | OutfitScalarFieldEnum[]
  }

  /**
   * User.outfitLikes
   */
  export type User$outfitLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    where?: OutfitLikeWhereInput
    orderBy?: OutfitLikeOrderByWithRelationInput | OutfitLikeOrderByWithRelationInput[]
    cursor?: OutfitLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitLikeScalarFieldEnum | OutfitLikeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    category: number | null
    subcategory: number | null
    color: number | null
    season: number | null
  }

  export type ItemSumAggregateOutputType = {
    id: number | null
    userId: number | null
    category: number | null
    subcategory: number | null
    color: number | null
    season: number | null
  }

  export type ItemMinAggregateOutputType = {
    id: number | null
    userId: number | null
    category: number | null
    subcategory: number | null
    brand: string | null
    color: number | null
    size: string | null
    season: number | null
    purchaseDate: Date | null
    image: string | null
    isDeleted: boolean | null
  }

  export type ItemMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    category: number | null
    subcategory: number | null
    brand: string | null
    color: number | null
    size: string | null
    season: number | null
    purchaseDate: Date | null
    image: string | null
    isDeleted: boolean | null
  }

  export type ItemCountAggregateOutputType = {
    id: number
    userId: number
    category: number
    subcategory: number
    brand: number
    color: number
    size: number
    season: number
    purchaseDate: number
    image: number
    isDeleted: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    id?: true
    userId?: true
    category?: true
    subcategory?: true
    color?: true
    season?: true
  }

  export type ItemSumAggregateInputType = {
    id?: true
    userId?: true
    category?: true
    subcategory?: true
    color?: true
    season?: true
  }

  export type ItemMinAggregateInputType = {
    id?: true
    userId?: true
    category?: true
    subcategory?: true
    brand?: true
    color?: true
    size?: true
    season?: true
    purchaseDate?: true
    image?: true
    isDeleted?: true
  }

  export type ItemMaxAggregateInputType = {
    id?: true
    userId?: true
    category?: true
    subcategory?: true
    brand?: true
    color?: true
    size?: true
    season?: true
    purchaseDate?: true
    image?: true
    isDeleted?: true
  }

  export type ItemCountAggregateInputType = {
    id?: true
    userId?: true
    category?: true
    subcategory?: true
    brand?: true
    color?: true
    size?: true
    season?: true
    purchaseDate?: true
    image?: true
    isDeleted?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    id: number
    userId: number
    category: number
    subcategory: number
    brand: string | null
    color: number
    size: string | null
    season: number
    purchaseDate: Date | null
    image: string | null
    isDeleted: boolean
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    category?: boolean
    subcategory?: boolean
    brand?: boolean
    color?: boolean
    size?: boolean
    season?: boolean
    purchaseDate?: boolean
    image?: boolean
    isDeleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    itemTags?: boolean | Item$itemTagsArgs<ExtArgs>
    outfitItems?: boolean | Item$outfitItemsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>



  export type ItemSelectScalar = {
    id?: boolean
    userId?: boolean
    category?: boolean
    subcategory?: boolean
    brand?: boolean
    color?: boolean
    size?: boolean
    season?: boolean
    purchaseDate?: boolean
    image?: boolean
    isDeleted?: boolean
  }

  export type ItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "category" | "subcategory" | "brand" | "color" | "size" | "season" | "purchaseDate" | "image" | "isDeleted", ExtArgs["result"]["item"]>
  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    itemTags?: boolean | Item$itemTagsArgs<ExtArgs>
    outfitItems?: boolean | Item$outfitItemsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      itemTags: Prisma.$ItemTagPayload<ExtArgs>[]
      outfitItems: Prisma.$OutfitItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      category: number
      subcategory: number
      brand: string | null
      color: number
      size: string | null
      season: number
      purchaseDate: Date | null
      image: string | null
      isDeleted: boolean
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    itemTags<T extends Item$itemTagsArgs<ExtArgs> = {}>(args?: Subset<T, Item$itemTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    outfitItems<T extends Item$outfitItemsArgs<ExtArgs> = {}>(args?: Subset<T, Item$outfitItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Item model
   */
  interface ItemFieldRefs {
    readonly id: FieldRef<"Item", 'Int'>
    readonly userId: FieldRef<"Item", 'Int'>
    readonly category: FieldRef<"Item", 'Int'>
    readonly subcategory: FieldRef<"Item", 'Int'>
    readonly brand: FieldRef<"Item", 'String'>
    readonly color: FieldRef<"Item", 'Int'>
    readonly size: FieldRef<"Item", 'String'>
    readonly season: FieldRef<"Item", 'Int'>
    readonly purchaseDate: FieldRef<"Item", 'DateTime'>
    readonly image: FieldRef<"Item", 'String'>
    readonly isDeleted: FieldRef<"Item", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to delete.
     */
    limit?: number
  }

  /**
   * Item.itemTags
   */
  export type Item$itemTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    where?: ItemTagWhereInput
    orderBy?: ItemTagOrderByWithRelationInput | ItemTagOrderByWithRelationInput[]
    cursor?: ItemTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemTagScalarFieldEnum | ItemTagScalarFieldEnum[]
  }

  /**
   * Item.outfitItems
   */
  export type Item$outfitItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    where?: OutfitItemWhereInput
    orderBy?: OutfitItemOrderByWithRelationInput | OutfitItemOrderByWithRelationInput[]
    cursor?: OutfitItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitItemScalarFieldEnum | OutfitItemScalarFieldEnum[]
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    id: number | null
  }

  export type LocationSumAggregateOutputType = {
    id: number | null
  }

  export type LocationMinAggregateOutputType = {
    id: number | null
    sido: string | null
    sigungu: string | null
    dong: string | null
    code: string | null
  }

  export type LocationMaxAggregateOutputType = {
    id: number | null
    sido: string | null
    sigungu: string | null
    dong: string | null
    code: string | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    sido: number
    sigungu: number
    dong: number
    code: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    id?: true
  }

  export type LocationSumAggregateInputType = {
    id?: true
  }

  export type LocationMinAggregateInputType = {
    id?: true
    sido?: true
    sigungu?: true
    dong?: true
    code?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    sido?: true
    sigungu?: true
    dong?: true
    code?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    sido?: true
    sigungu?: true
    dong?: true
    code?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: number
    sido: string
    sigungu: string
    dong: string
    code: string
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sido?: boolean
    sigungu?: boolean
    dong?: boolean
    code?: boolean
    weather?: boolean | Location$weatherArgs<ExtArgs>
    outfits?: boolean | Location$outfitsArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>



  export type LocationSelectScalar = {
    id?: boolean
    sido?: boolean
    sigungu?: boolean
    dong?: boolean
    code?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sido" | "sigungu" | "dong" | "code", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    weather?: boolean | Location$weatherArgs<ExtArgs>
    outfits?: boolean | Location$outfitsArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      weather: Prisma.$WeatherPayload<ExtArgs>[]
      outfits: Prisma.$OutfitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sido: string
      sigungu: string
      dong: string
      code: string
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    weather<T extends Location$weatherArgs<ExtArgs> = {}>(args?: Subset<T, Location$weatherArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    outfits<T extends Location$outfitsArgs<ExtArgs> = {}>(args?: Subset<T, Location$outfitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'Int'>
    readonly sido: FieldRef<"Location", 'String'>
    readonly sigungu: FieldRef<"Location", 'String'>
    readonly dong: FieldRef<"Location", 'String'>
    readonly code: FieldRef<"Location", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.weather
   */
  export type Location$weatherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    where?: WeatherWhereInput
    orderBy?: WeatherOrderByWithRelationInput | WeatherOrderByWithRelationInput[]
    cursor?: WeatherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeatherScalarFieldEnum | WeatherScalarFieldEnum[]
  }

  /**
   * Location.outfits
   */
  export type Location$outfitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    where?: OutfitWhereInput
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    cursor?: OutfitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitScalarFieldEnum | OutfitScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model Weather
   */

  export type AggregateWeather = {
    _count: WeatherCountAggregateOutputType | null
    _avg: WeatherAvgAggregateOutputType | null
    _sum: WeatherSumAggregateOutputType | null
    _min: WeatherMinAggregateOutputType | null
    _max: WeatherMaxAggregateOutputType | null
  }

  export type WeatherAvgAggregateOutputType = {
    locationId: number | null
    tempMin: number | null
    tempMax: number | null
    tempAvg: number | null
    feelsLike: number | null
    precipitation: number | null
  }

  export type WeatherSumAggregateOutputType = {
    locationId: number | null
    tempMin: number | null
    tempMax: number | null
    tempAvg: number | null
    feelsLike: number | null
    precipitation: number | null
  }

  export type WeatherMinAggregateOutputType = {
    date: Date | null
    locationId: number | null
    tempMin: number | null
    tempMax: number | null
    tempAvg: number | null
    feelsLike: number | null
    precipitation: number | null
    weatherIcon: string | null
    status: string | null
  }

  export type WeatherMaxAggregateOutputType = {
    date: Date | null
    locationId: number | null
    tempMin: number | null
    tempMax: number | null
    tempAvg: number | null
    feelsLike: number | null
    precipitation: number | null
    weatherIcon: string | null
    status: string | null
  }

  export type WeatherCountAggregateOutputType = {
    date: number
    locationId: number
    tempMin: number
    tempMax: number
    tempAvg: number
    feelsLike: number
    precipitation: number
    weatherIcon: number
    status: number
    _all: number
  }


  export type WeatherAvgAggregateInputType = {
    locationId?: true
    tempMin?: true
    tempMax?: true
    tempAvg?: true
    feelsLike?: true
    precipitation?: true
  }

  export type WeatherSumAggregateInputType = {
    locationId?: true
    tempMin?: true
    tempMax?: true
    tempAvg?: true
    feelsLike?: true
    precipitation?: true
  }

  export type WeatherMinAggregateInputType = {
    date?: true
    locationId?: true
    tempMin?: true
    tempMax?: true
    tempAvg?: true
    feelsLike?: true
    precipitation?: true
    weatherIcon?: true
    status?: true
  }

  export type WeatherMaxAggregateInputType = {
    date?: true
    locationId?: true
    tempMin?: true
    tempMax?: true
    tempAvg?: true
    feelsLike?: true
    precipitation?: true
    weatherIcon?: true
    status?: true
  }

  export type WeatherCountAggregateInputType = {
    date?: true
    locationId?: true
    tempMin?: true
    tempMax?: true
    tempAvg?: true
    feelsLike?: true
    precipitation?: true
    weatherIcon?: true
    status?: true
    _all?: true
  }

  export type WeatherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Weather to aggregate.
     */
    where?: WeatherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Weathers to fetch.
     */
    orderBy?: WeatherOrderByWithRelationInput | WeatherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeatherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Weathers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Weathers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Weathers
    **/
    _count?: true | WeatherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeatherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeatherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeatherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeatherMaxAggregateInputType
  }

  export type GetWeatherAggregateType<T extends WeatherAggregateArgs> = {
        [P in keyof T & keyof AggregateWeather]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeather[P]>
      : GetScalarType<T[P], AggregateWeather[P]>
  }




  export type WeatherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeatherWhereInput
    orderBy?: WeatherOrderByWithAggregationInput | WeatherOrderByWithAggregationInput[]
    by: WeatherScalarFieldEnum[] | WeatherScalarFieldEnum
    having?: WeatherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeatherCountAggregateInputType | true
    _avg?: WeatherAvgAggregateInputType
    _sum?: WeatherSumAggregateInputType
    _min?: WeatherMinAggregateInputType
    _max?: WeatherMaxAggregateInputType
  }

  export type WeatherGroupByOutputType = {
    date: Date
    locationId: number
    tempMin: number | null
    tempMax: number | null
    tempAvg: number | null
    feelsLike: number | null
    precipitation: number | null
    weatherIcon: string | null
    status: string | null
    _count: WeatherCountAggregateOutputType | null
    _avg: WeatherAvgAggregateOutputType | null
    _sum: WeatherSumAggregateOutputType | null
    _min: WeatherMinAggregateOutputType | null
    _max: WeatherMaxAggregateOutputType | null
  }

  type GetWeatherGroupByPayload<T extends WeatherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeatherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeatherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeatherGroupByOutputType[P]>
            : GetScalarType<T[P], WeatherGroupByOutputType[P]>
        }
      >
    >


  export type WeatherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    locationId?: boolean
    tempMin?: boolean
    tempMax?: boolean
    tempAvg?: boolean
    feelsLike?: boolean
    precipitation?: boolean
    weatherIcon?: boolean
    status?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weather"]>



  export type WeatherSelectScalar = {
    date?: boolean
    locationId?: boolean
    tempMin?: boolean
    tempMax?: boolean
    tempAvg?: boolean
    feelsLike?: boolean
    precipitation?: boolean
    weatherIcon?: boolean
    status?: boolean
  }

  export type WeatherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"date" | "locationId" | "tempMin" | "tempMax" | "tempAvg" | "feelsLike" | "precipitation" | "weatherIcon" | "status", ExtArgs["result"]["weather"]>
  export type WeatherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }

  export type $WeatherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Weather"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      date: Date
      locationId: number
      tempMin: number | null
      tempMax: number | null
      tempAvg: number | null
      feelsLike: number | null
      precipitation: number | null
      weatherIcon: string | null
      status: string | null
    }, ExtArgs["result"]["weather"]>
    composites: {}
  }

  type WeatherGetPayload<S extends boolean | null | undefined | WeatherDefaultArgs> = $Result.GetResult<Prisma.$WeatherPayload, S>

  type WeatherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeatherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeatherCountAggregateInputType | true
    }

  export interface WeatherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Weather'], meta: { name: 'Weather' } }
    /**
     * Find zero or one Weather that matches the filter.
     * @param {WeatherFindUniqueArgs} args - Arguments to find a Weather
     * @example
     * // Get one Weather
     * const weather = await prisma.weather.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeatherFindUniqueArgs>(args: SelectSubset<T, WeatherFindUniqueArgs<ExtArgs>>): Prisma__WeatherClient<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Weather that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeatherFindUniqueOrThrowArgs} args - Arguments to find a Weather
     * @example
     * // Get one Weather
     * const weather = await prisma.weather.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeatherFindUniqueOrThrowArgs>(args: SelectSubset<T, WeatherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeatherClient<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Weather that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherFindFirstArgs} args - Arguments to find a Weather
     * @example
     * // Get one Weather
     * const weather = await prisma.weather.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeatherFindFirstArgs>(args?: SelectSubset<T, WeatherFindFirstArgs<ExtArgs>>): Prisma__WeatherClient<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Weather that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherFindFirstOrThrowArgs} args - Arguments to find a Weather
     * @example
     * // Get one Weather
     * const weather = await prisma.weather.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeatherFindFirstOrThrowArgs>(args?: SelectSubset<T, WeatherFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeatherClient<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Weathers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Weathers
     * const weathers = await prisma.weather.findMany()
     * 
     * // Get first 10 Weathers
     * const weathers = await prisma.weather.findMany({ take: 10 })
     * 
     * // Only select the `date`
     * const weatherWithDateOnly = await prisma.weather.findMany({ select: { date: true } })
     * 
     */
    findMany<T extends WeatherFindManyArgs>(args?: SelectSubset<T, WeatherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Weather.
     * @param {WeatherCreateArgs} args - Arguments to create a Weather.
     * @example
     * // Create one Weather
     * const Weather = await prisma.weather.create({
     *   data: {
     *     // ... data to create a Weather
     *   }
     * })
     * 
     */
    create<T extends WeatherCreateArgs>(args: SelectSubset<T, WeatherCreateArgs<ExtArgs>>): Prisma__WeatherClient<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Weathers.
     * @param {WeatherCreateManyArgs} args - Arguments to create many Weathers.
     * @example
     * // Create many Weathers
     * const weather = await prisma.weather.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeatherCreateManyArgs>(args?: SelectSubset<T, WeatherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Weather.
     * @param {WeatherDeleteArgs} args - Arguments to delete one Weather.
     * @example
     * // Delete one Weather
     * const Weather = await prisma.weather.delete({
     *   where: {
     *     // ... filter to delete one Weather
     *   }
     * })
     * 
     */
    delete<T extends WeatherDeleteArgs>(args: SelectSubset<T, WeatherDeleteArgs<ExtArgs>>): Prisma__WeatherClient<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Weather.
     * @param {WeatherUpdateArgs} args - Arguments to update one Weather.
     * @example
     * // Update one Weather
     * const weather = await prisma.weather.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeatherUpdateArgs>(args: SelectSubset<T, WeatherUpdateArgs<ExtArgs>>): Prisma__WeatherClient<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Weathers.
     * @param {WeatherDeleteManyArgs} args - Arguments to filter Weathers to delete.
     * @example
     * // Delete a few Weathers
     * const { count } = await prisma.weather.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeatherDeleteManyArgs>(args?: SelectSubset<T, WeatherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Weathers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Weathers
     * const weather = await prisma.weather.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeatherUpdateManyArgs>(args: SelectSubset<T, WeatherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Weather.
     * @param {WeatherUpsertArgs} args - Arguments to update or create a Weather.
     * @example
     * // Update or create a Weather
     * const weather = await prisma.weather.upsert({
     *   create: {
     *     // ... data to create a Weather
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Weather we want to update
     *   }
     * })
     */
    upsert<T extends WeatherUpsertArgs>(args: SelectSubset<T, WeatherUpsertArgs<ExtArgs>>): Prisma__WeatherClient<$Result.GetResult<Prisma.$WeatherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Weathers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherCountArgs} args - Arguments to filter Weathers to count.
     * @example
     * // Count the number of Weathers
     * const count = await prisma.weather.count({
     *   where: {
     *     // ... the filter for the Weathers we want to count
     *   }
     * })
    **/
    count<T extends WeatherCountArgs>(
      args?: Subset<T, WeatherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeatherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Weather.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeatherAggregateArgs>(args: Subset<T, WeatherAggregateArgs>): Prisma.PrismaPromise<GetWeatherAggregateType<T>>

    /**
     * Group by Weather.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeatherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeatherGroupByArgs['orderBy'] }
        : { orderBy?: WeatherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeatherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeatherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Weather model
   */
  readonly fields: WeatherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Weather.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeatherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Weather model
   */
  interface WeatherFieldRefs {
    readonly date: FieldRef<"Weather", 'DateTime'>
    readonly locationId: FieldRef<"Weather", 'Int'>
    readonly tempMin: FieldRef<"Weather", 'Float'>
    readonly tempMax: FieldRef<"Weather", 'Float'>
    readonly tempAvg: FieldRef<"Weather", 'Float'>
    readonly feelsLike: FieldRef<"Weather", 'Float'>
    readonly precipitation: FieldRef<"Weather", 'Float'>
    readonly weatherIcon: FieldRef<"Weather", 'String'>
    readonly status: FieldRef<"Weather", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Weather findUnique
   */
  export type WeatherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    /**
     * Filter, which Weather to fetch.
     */
    where: WeatherWhereUniqueInput
  }

  /**
   * Weather findUniqueOrThrow
   */
  export type WeatherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    /**
     * Filter, which Weather to fetch.
     */
    where: WeatherWhereUniqueInput
  }

  /**
   * Weather findFirst
   */
  export type WeatherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    /**
     * Filter, which Weather to fetch.
     */
    where?: WeatherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Weathers to fetch.
     */
    orderBy?: WeatherOrderByWithRelationInput | WeatherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Weathers.
     */
    cursor?: WeatherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Weathers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Weathers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Weathers.
     */
    distinct?: WeatherScalarFieldEnum | WeatherScalarFieldEnum[]
  }

  /**
   * Weather findFirstOrThrow
   */
  export type WeatherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    /**
     * Filter, which Weather to fetch.
     */
    where?: WeatherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Weathers to fetch.
     */
    orderBy?: WeatherOrderByWithRelationInput | WeatherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Weathers.
     */
    cursor?: WeatherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Weathers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Weathers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Weathers.
     */
    distinct?: WeatherScalarFieldEnum | WeatherScalarFieldEnum[]
  }

  /**
   * Weather findMany
   */
  export type WeatherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    /**
     * Filter, which Weathers to fetch.
     */
    where?: WeatherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Weathers to fetch.
     */
    orderBy?: WeatherOrderByWithRelationInput | WeatherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Weathers.
     */
    cursor?: WeatherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Weathers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Weathers.
     */
    skip?: number
    distinct?: WeatherScalarFieldEnum | WeatherScalarFieldEnum[]
  }

  /**
   * Weather create
   */
  export type WeatherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    /**
     * The data needed to create a Weather.
     */
    data: XOR<WeatherCreateInput, WeatherUncheckedCreateInput>
  }

  /**
   * Weather createMany
   */
  export type WeatherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Weathers.
     */
    data: WeatherCreateManyInput | WeatherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Weather update
   */
  export type WeatherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    /**
     * The data needed to update a Weather.
     */
    data: XOR<WeatherUpdateInput, WeatherUncheckedUpdateInput>
    /**
     * Choose, which Weather to update.
     */
    where: WeatherWhereUniqueInput
  }

  /**
   * Weather updateMany
   */
  export type WeatherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Weathers.
     */
    data: XOR<WeatherUpdateManyMutationInput, WeatherUncheckedUpdateManyInput>
    /**
     * Filter which Weathers to update
     */
    where?: WeatherWhereInput
    /**
     * Limit how many Weathers to update.
     */
    limit?: number
  }

  /**
   * Weather upsert
   */
  export type WeatherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    /**
     * The filter to search for the Weather to update in case it exists.
     */
    where: WeatherWhereUniqueInput
    /**
     * In case the Weather found by the `where` argument doesn't exist, create a new Weather with this data.
     */
    create: XOR<WeatherCreateInput, WeatherUncheckedCreateInput>
    /**
     * In case the Weather was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeatherUpdateInput, WeatherUncheckedUpdateInput>
  }

  /**
   * Weather delete
   */
  export type WeatherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
    /**
     * Filter which Weather to delete.
     */
    where: WeatherWhereUniqueInput
  }

  /**
   * Weather deleteMany
   */
  export type WeatherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Weathers to delete
     */
    where?: WeatherWhereInput
    /**
     * Limit how many Weathers to delete.
     */
    limit?: number
  }

  /**
   * Weather without action
   */
  export type WeatherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Weather
     */
    select?: WeatherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Weather
     */
    omit?: WeatherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeatherInclude<ExtArgs> | null
  }


  /**
   * Model Outfit
   */

  export type AggregateOutfit = {
    _count: OutfitCountAggregateOutputType | null
    _avg: OutfitAvgAggregateOutputType | null
    _sum: OutfitSumAggregateOutputType | null
    _min: OutfitMinAggregateOutputType | null
    _max: OutfitMaxAggregateOutputType | null
  }

  export type OutfitAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    locationId: number | null
    weatherTempAvg: number | null
  }

  export type OutfitSumAggregateOutputType = {
    id: number | null
    userId: number | null
    locationId: number | null
    weatherTempAvg: number | null
  }

  export type OutfitMinAggregateOutputType = {
    id: number | null
    userId: number | null
    locationId: number | null
    date: Date | null
    weatherTempAvg: number | null
    mainImage: string | null
    memo: string | null
  }

  export type OutfitMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    locationId: number | null
    date: Date | null
    weatherTempAvg: number | null
    mainImage: string | null
    memo: string | null
  }

  export type OutfitCountAggregateOutputType = {
    id: number
    userId: number
    locationId: number
    date: number
    weatherTempAvg: number
    mainImage: number
    memo: number
    _all: number
  }


  export type OutfitAvgAggregateInputType = {
    id?: true
    userId?: true
    locationId?: true
    weatherTempAvg?: true
  }

  export type OutfitSumAggregateInputType = {
    id?: true
    userId?: true
    locationId?: true
    weatherTempAvg?: true
  }

  export type OutfitMinAggregateInputType = {
    id?: true
    userId?: true
    locationId?: true
    date?: true
    weatherTempAvg?: true
    mainImage?: true
    memo?: true
  }

  export type OutfitMaxAggregateInputType = {
    id?: true
    userId?: true
    locationId?: true
    date?: true
    weatherTempAvg?: true
    mainImage?: true
    memo?: true
  }

  export type OutfitCountAggregateInputType = {
    id?: true
    userId?: true
    locationId?: true
    date?: true
    weatherTempAvg?: true
    mainImage?: true
    memo?: true
    _all?: true
  }

  export type OutfitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outfit to aggregate.
     */
    where?: OutfitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outfits to fetch.
     */
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutfitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outfits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outfits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Outfits
    **/
    _count?: true | OutfitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutfitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutfitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutfitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutfitMaxAggregateInputType
  }

  export type GetOutfitAggregateType<T extends OutfitAggregateArgs> = {
        [P in keyof T & keyof AggregateOutfit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutfit[P]>
      : GetScalarType<T[P], AggregateOutfit[P]>
  }




  export type OutfitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitWhereInput
    orderBy?: OutfitOrderByWithAggregationInput | OutfitOrderByWithAggregationInput[]
    by: OutfitScalarFieldEnum[] | OutfitScalarFieldEnum
    having?: OutfitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutfitCountAggregateInputType | true
    _avg?: OutfitAvgAggregateInputType
    _sum?: OutfitSumAggregateInputType
    _min?: OutfitMinAggregateInputType
    _max?: OutfitMaxAggregateInputType
  }

  export type OutfitGroupByOutputType = {
    id: number
    userId: number
    locationId: number
    date: Date
    weatherTempAvg: number | null
    mainImage: string | null
    memo: string | null
    _count: OutfitCountAggregateOutputType | null
    _avg: OutfitAvgAggregateOutputType | null
    _sum: OutfitSumAggregateOutputType | null
    _min: OutfitMinAggregateOutputType | null
    _max: OutfitMaxAggregateOutputType | null
  }

  type GetOutfitGroupByPayload<T extends OutfitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutfitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutfitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutfitGroupByOutputType[P]>
            : GetScalarType<T[P], OutfitGroupByOutputType[P]>
        }
      >
    >


  export type OutfitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    locationId?: boolean
    date?: boolean
    weatherTempAvg?: boolean
    mainImage?: boolean
    memo?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    outfitItems?: boolean | Outfit$outfitItemsArgs<ExtArgs>
    outfitTags?: boolean | Outfit$outfitTagsArgs<ExtArgs>
    outfitLikes?: boolean | Outfit$outfitLikesArgs<ExtArgs>
    _count?: boolean | OutfitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfit"]>



  export type OutfitSelectScalar = {
    id?: boolean
    userId?: boolean
    locationId?: boolean
    date?: boolean
    weatherTempAvg?: boolean
    mainImage?: boolean
    memo?: boolean
  }

  export type OutfitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "locationId" | "date" | "weatherTempAvg" | "mainImage" | "memo", ExtArgs["result"]["outfit"]>
  export type OutfitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    outfitItems?: boolean | Outfit$outfitItemsArgs<ExtArgs>
    outfitTags?: boolean | Outfit$outfitTagsArgs<ExtArgs>
    outfitLikes?: boolean | Outfit$outfitLikesArgs<ExtArgs>
    _count?: boolean | OutfitCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OutfitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Outfit"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      location: Prisma.$LocationPayload<ExtArgs>
      outfitItems: Prisma.$OutfitItemPayload<ExtArgs>[]
      outfitTags: Prisma.$OutfitTagPayload<ExtArgs>[]
      outfitLikes: Prisma.$OutfitLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      locationId: number
      date: Date
      weatherTempAvg: number | null
      mainImage: string | null
      memo: string | null
    }, ExtArgs["result"]["outfit"]>
    composites: {}
  }

  type OutfitGetPayload<S extends boolean | null | undefined | OutfitDefaultArgs> = $Result.GetResult<Prisma.$OutfitPayload, S>

  type OutfitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutfitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutfitCountAggregateInputType | true
    }

  export interface OutfitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Outfit'], meta: { name: 'Outfit' } }
    /**
     * Find zero or one Outfit that matches the filter.
     * @param {OutfitFindUniqueArgs} args - Arguments to find a Outfit
     * @example
     * // Get one Outfit
     * const outfit = await prisma.outfit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutfitFindUniqueArgs>(args: SelectSubset<T, OutfitFindUniqueArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Outfit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutfitFindUniqueOrThrowArgs} args - Arguments to find a Outfit
     * @example
     * // Get one Outfit
     * const outfit = await prisma.outfit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutfitFindUniqueOrThrowArgs>(args: SelectSubset<T, OutfitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outfit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitFindFirstArgs} args - Arguments to find a Outfit
     * @example
     * // Get one Outfit
     * const outfit = await prisma.outfit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutfitFindFirstArgs>(args?: SelectSubset<T, OutfitFindFirstArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outfit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitFindFirstOrThrowArgs} args - Arguments to find a Outfit
     * @example
     * // Get one Outfit
     * const outfit = await prisma.outfit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutfitFindFirstOrThrowArgs>(args?: SelectSubset<T, OutfitFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Outfits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Outfits
     * const outfits = await prisma.outfit.findMany()
     * 
     * // Get first 10 Outfits
     * const outfits = await prisma.outfit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outfitWithIdOnly = await prisma.outfit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutfitFindManyArgs>(args?: SelectSubset<T, OutfitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Outfit.
     * @param {OutfitCreateArgs} args - Arguments to create a Outfit.
     * @example
     * // Create one Outfit
     * const Outfit = await prisma.outfit.create({
     *   data: {
     *     // ... data to create a Outfit
     *   }
     * })
     * 
     */
    create<T extends OutfitCreateArgs>(args: SelectSubset<T, OutfitCreateArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Outfits.
     * @param {OutfitCreateManyArgs} args - Arguments to create many Outfits.
     * @example
     * // Create many Outfits
     * const outfit = await prisma.outfit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutfitCreateManyArgs>(args?: SelectSubset<T, OutfitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Outfit.
     * @param {OutfitDeleteArgs} args - Arguments to delete one Outfit.
     * @example
     * // Delete one Outfit
     * const Outfit = await prisma.outfit.delete({
     *   where: {
     *     // ... filter to delete one Outfit
     *   }
     * })
     * 
     */
    delete<T extends OutfitDeleteArgs>(args: SelectSubset<T, OutfitDeleteArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Outfit.
     * @param {OutfitUpdateArgs} args - Arguments to update one Outfit.
     * @example
     * // Update one Outfit
     * const outfit = await prisma.outfit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutfitUpdateArgs>(args: SelectSubset<T, OutfitUpdateArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Outfits.
     * @param {OutfitDeleteManyArgs} args - Arguments to filter Outfits to delete.
     * @example
     * // Delete a few Outfits
     * const { count } = await prisma.outfit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutfitDeleteManyArgs>(args?: SelectSubset<T, OutfitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outfits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Outfits
     * const outfit = await prisma.outfit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutfitUpdateManyArgs>(args: SelectSubset<T, OutfitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Outfit.
     * @param {OutfitUpsertArgs} args - Arguments to update or create a Outfit.
     * @example
     * // Update or create a Outfit
     * const outfit = await prisma.outfit.upsert({
     *   create: {
     *     // ... data to create a Outfit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Outfit we want to update
     *   }
     * })
     */
    upsert<T extends OutfitUpsertArgs>(args: SelectSubset<T, OutfitUpsertArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Outfits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitCountArgs} args - Arguments to filter Outfits to count.
     * @example
     * // Count the number of Outfits
     * const count = await prisma.outfit.count({
     *   where: {
     *     // ... the filter for the Outfits we want to count
     *   }
     * })
    **/
    count<T extends OutfitCountArgs>(
      args?: Subset<T, OutfitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutfitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Outfit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutfitAggregateArgs>(args: Subset<T, OutfitAggregateArgs>): Prisma.PrismaPromise<GetOutfitAggregateType<T>>

    /**
     * Group by Outfit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutfitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutfitGroupByArgs['orderBy'] }
        : { orderBy?: OutfitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutfitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutfitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Outfit model
   */
  readonly fields: OutfitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Outfit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutfitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    outfitItems<T extends Outfit$outfitItemsArgs<ExtArgs> = {}>(args?: Subset<T, Outfit$outfitItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    outfitTags<T extends Outfit$outfitTagsArgs<ExtArgs> = {}>(args?: Subset<T, Outfit$outfitTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    outfitLikes<T extends Outfit$outfitLikesArgs<ExtArgs> = {}>(args?: Subset<T, Outfit$outfitLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Outfit model
   */
  interface OutfitFieldRefs {
    readonly id: FieldRef<"Outfit", 'Int'>
    readonly userId: FieldRef<"Outfit", 'Int'>
    readonly locationId: FieldRef<"Outfit", 'Int'>
    readonly date: FieldRef<"Outfit", 'DateTime'>
    readonly weatherTempAvg: FieldRef<"Outfit", 'Float'>
    readonly mainImage: FieldRef<"Outfit", 'String'>
    readonly memo: FieldRef<"Outfit", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Outfit findUnique
   */
  export type OutfitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfit to fetch.
     */
    where: OutfitWhereUniqueInput
  }

  /**
   * Outfit findUniqueOrThrow
   */
  export type OutfitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfit to fetch.
     */
    where: OutfitWhereUniqueInput
  }

  /**
   * Outfit findFirst
   */
  export type OutfitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfit to fetch.
     */
    where?: OutfitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outfits to fetch.
     */
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outfits.
     */
    cursor?: OutfitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outfits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outfits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outfits.
     */
    distinct?: OutfitScalarFieldEnum | OutfitScalarFieldEnum[]
  }

  /**
   * Outfit findFirstOrThrow
   */
  export type OutfitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfit to fetch.
     */
    where?: OutfitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outfits to fetch.
     */
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outfits.
     */
    cursor?: OutfitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outfits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outfits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outfits.
     */
    distinct?: OutfitScalarFieldEnum | OutfitScalarFieldEnum[]
  }

  /**
   * Outfit findMany
   */
  export type OutfitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter, which Outfits to fetch.
     */
    where?: OutfitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outfits to fetch.
     */
    orderBy?: OutfitOrderByWithRelationInput | OutfitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Outfits.
     */
    cursor?: OutfitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outfits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outfits.
     */
    skip?: number
    distinct?: OutfitScalarFieldEnum | OutfitScalarFieldEnum[]
  }

  /**
   * Outfit create
   */
  export type OutfitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * The data needed to create a Outfit.
     */
    data: XOR<OutfitCreateInput, OutfitUncheckedCreateInput>
  }

  /**
   * Outfit createMany
   */
  export type OutfitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Outfits.
     */
    data: OutfitCreateManyInput | OutfitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Outfit update
   */
  export type OutfitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * The data needed to update a Outfit.
     */
    data: XOR<OutfitUpdateInput, OutfitUncheckedUpdateInput>
    /**
     * Choose, which Outfit to update.
     */
    where: OutfitWhereUniqueInput
  }

  /**
   * Outfit updateMany
   */
  export type OutfitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Outfits.
     */
    data: XOR<OutfitUpdateManyMutationInput, OutfitUncheckedUpdateManyInput>
    /**
     * Filter which Outfits to update
     */
    where?: OutfitWhereInput
    /**
     * Limit how many Outfits to update.
     */
    limit?: number
  }

  /**
   * Outfit upsert
   */
  export type OutfitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * The filter to search for the Outfit to update in case it exists.
     */
    where: OutfitWhereUniqueInput
    /**
     * In case the Outfit found by the `where` argument doesn't exist, create a new Outfit with this data.
     */
    create: XOR<OutfitCreateInput, OutfitUncheckedCreateInput>
    /**
     * In case the Outfit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutfitUpdateInput, OutfitUncheckedUpdateInput>
  }

  /**
   * Outfit delete
   */
  export type OutfitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
    /**
     * Filter which Outfit to delete.
     */
    where: OutfitWhereUniqueInput
  }

  /**
   * Outfit deleteMany
   */
  export type OutfitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outfits to delete
     */
    where?: OutfitWhereInput
    /**
     * Limit how many Outfits to delete.
     */
    limit?: number
  }

  /**
   * Outfit.outfitItems
   */
  export type Outfit$outfitItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    where?: OutfitItemWhereInput
    orderBy?: OutfitItemOrderByWithRelationInput | OutfitItemOrderByWithRelationInput[]
    cursor?: OutfitItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitItemScalarFieldEnum | OutfitItemScalarFieldEnum[]
  }

  /**
   * Outfit.outfitTags
   */
  export type Outfit$outfitTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    where?: OutfitTagWhereInput
    orderBy?: OutfitTagOrderByWithRelationInput | OutfitTagOrderByWithRelationInput[]
    cursor?: OutfitTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitTagScalarFieldEnum | OutfitTagScalarFieldEnum[]
  }

  /**
   * Outfit.outfitLikes
   */
  export type Outfit$outfitLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    where?: OutfitLikeWhereInput
    orderBy?: OutfitLikeOrderByWithRelationInput | OutfitLikeOrderByWithRelationInput[]
    cursor?: OutfitLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitLikeScalarFieldEnum | OutfitLikeScalarFieldEnum[]
  }

  /**
   * Outfit without action
   */
  export type OutfitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outfit
     */
    select?: OutfitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outfit
     */
    omit?: OutfitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    type: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: number
    name: string
    type: string
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    itemTags?: boolean | Tag$itemTagsArgs<ExtArgs>
    outfitTags?: boolean | Tag$outfitTagsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>



  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemTags?: boolean | Tag$itemTagsArgs<ExtArgs>
    outfitTags?: boolean | Tag$outfitTagsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      itemTags: Prisma.$ItemTagPayload<ExtArgs>[]
      outfitTags: Prisma.$OutfitTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      type: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itemTags<T extends Tag$itemTagsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$itemTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    outfitTags<T extends Tag$outfitTagsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$outfitTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'Int'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly type: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.itemTags
   */
  export type Tag$itemTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    where?: ItemTagWhereInput
    orderBy?: ItemTagOrderByWithRelationInput | ItemTagOrderByWithRelationInput[]
    cursor?: ItemTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemTagScalarFieldEnum | ItemTagScalarFieldEnum[]
  }

  /**
   * Tag.outfitTags
   */
  export type Tag$outfitTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    where?: OutfitTagWhereInput
    orderBy?: OutfitTagOrderByWithRelationInput | OutfitTagOrderByWithRelationInput[]
    cursor?: OutfitTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutfitTagScalarFieldEnum | OutfitTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model ItemTag
   */

  export type AggregateItemTag = {
    _count: ItemTagCountAggregateOutputType | null
    _avg: ItemTagAvgAggregateOutputType | null
    _sum: ItemTagSumAggregateOutputType | null
    _min: ItemTagMinAggregateOutputType | null
    _max: ItemTagMaxAggregateOutputType | null
  }

  export type ItemTagAvgAggregateOutputType = {
    id: number | null
    itemId: number | null
    tagId: number | null
  }

  export type ItemTagSumAggregateOutputType = {
    id: number | null
    itemId: number | null
    tagId: number | null
  }

  export type ItemTagMinAggregateOutputType = {
    id: number | null
    itemId: number | null
    tagId: number | null
  }

  export type ItemTagMaxAggregateOutputType = {
    id: number | null
    itemId: number | null
    tagId: number | null
  }

  export type ItemTagCountAggregateOutputType = {
    id: number
    itemId: number
    tagId: number
    _all: number
  }


  export type ItemTagAvgAggregateInputType = {
    id?: true
    itemId?: true
    tagId?: true
  }

  export type ItemTagSumAggregateInputType = {
    id?: true
    itemId?: true
    tagId?: true
  }

  export type ItemTagMinAggregateInputType = {
    id?: true
    itemId?: true
    tagId?: true
  }

  export type ItemTagMaxAggregateInputType = {
    id?: true
    itemId?: true
    tagId?: true
  }

  export type ItemTagCountAggregateInputType = {
    id?: true
    itemId?: true
    tagId?: true
    _all?: true
  }

  export type ItemTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemTag to aggregate.
     */
    where?: ItemTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemTags to fetch.
     */
    orderBy?: ItemTagOrderByWithRelationInput | ItemTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemTags
    **/
    _count?: true | ItemTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemTagMaxAggregateInputType
  }

  export type GetItemTagAggregateType<T extends ItemTagAggregateArgs> = {
        [P in keyof T & keyof AggregateItemTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemTag[P]>
      : GetScalarType<T[P], AggregateItemTag[P]>
  }




  export type ItemTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemTagWhereInput
    orderBy?: ItemTagOrderByWithAggregationInput | ItemTagOrderByWithAggregationInput[]
    by: ItemTagScalarFieldEnum[] | ItemTagScalarFieldEnum
    having?: ItemTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemTagCountAggregateInputType | true
    _avg?: ItemTagAvgAggregateInputType
    _sum?: ItemTagSumAggregateInputType
    _min?: ItemTagMinAggregateInputType
    _max?: ItemTagMaxAggregateInputType
  }

  export type ItemTagGroupByOutputType = {
    id: number
    itemId: number
    tagId: number
    _count: ItemTagCountAggregateOutputType | null
    _avg: ItemTagAvgAggregateOutputType | null
    _sum: ItemTagSumAggregateOutputType | null
    _min: ItemTagMinAggregateOutputType | null
    _max: ItemTagMaxAggregateOutputType | null
  }

  type GetItemTagGroupByPayload<T extends ItemTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemTagGroupByOutputType[P]>
            : GetScalarType<T[P], ItemTagGroupByOutputType[P]>
        }
      >
    >


  export type ItemTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    tagId?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemTag"]>



  export type ItemTagSelectScalar = {
    id?: boolean
    itemId?: boolean
    tagId?: boolean
  }

  export type ItemTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "itemId" | "tagId", ExtArgs["result"]["itemTag"]>
  export type ItemTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $ItemTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemTag"
    objects: {
      item: Prisma.$ItemPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      itemId: number
      tagId: number
    }, ExtArgs["result"]["itemTag"]>
    composites: {}
  }

  type ItemTagGetPayload<S extends boolean | null | undefined | ItemTagDefaultArgs> = $Result.GetResult<Prisma.$ItemTagPayload, S>

  type ItemTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemTagCountAggregateInputType | true
    }

  export interface ItemTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemTag'], meta: { name: 'ItemTag' } }
    /**
     * Find zero or one ItemTag that matches the filter.
     * @param {ItemTagFindUniqueArgs} args - Arguments to find a ItemTag
     * @example
     * // Get one ItemTag
     * const itemTag = await prisma.itemTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemTagFindUniqueArgs>(args: SelectSubset<T, ItemTagFindUniqueArgs<ExtArgs>>): Prisma__ItemTagClient<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemTagFindUniqueOrThrowArgs} args - Arguments to find a ItemTag
     * @example
     * // Get one ItemTag
     * const itemTag = await prisma.itemTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemTagFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemTagClient<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemTagFindFirstArgs} args - Arguments to find a ItemTag
     * @example
     * // Get one ItemTag
     * const itemTag = await prisma.itemTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemTagFindFirstArgs>(args?: SelectSubset<T, ItemTagFindFirstArgs<ExtArgs>>): Prisma__ItemTagClient<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemTagFindFirstOrThrowArgs} args - Arguments to find a ItemTag
     * @example
     * // Get one ItemTag
     * const itemTag = await prisma.itemTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemTagFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemTagClient<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemTags
     * const itemTags = await prisma.itemTag.findMany()
     * 
     * // Get first 10 ItemTags
     * const itemTags = await prisma.itemTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemTagWithIdOnly = await prisma.itemTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemTagFindManyArgs>(args?: SelectSubset<T, ItemTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemTag.
     * @param {ItemTagCreateArgs} args - Arguments to create a ItemTag.
     * @example
     * // Create one ItemTag
     * const ItemTag = await prisma.itemTag.create({
     *   data: {
     *     // ... data to create a ItemTag
     *   }
     * })
     * 
     */
    create<T extends ItemTagCreateArgs>(args: SelectSubset<T, ItemTagCreateArgs<ExtArgs>>): Prisma__ItemTagClient<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemTags.
     * @param {ItemTagCreateManyArgs} args - Arguments to create many ItemTags.
     * @example
     * // Create many ItemTags
     * const itemTag = await prisma.itemTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemTagCreateManyArgs>(args?: SelectSubset<T, ItemTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ItemTag.
     * @param {ItemTagDeleteArgs} args - Arguments to delete one ItemTag.
     * @example
     * // Delete one ItemTag
     * const ItemTag = await prisma.itemTag.delete({
     *   where: {
     *     // ... filter to delete one ItemTag
     *   }
     * })
     * 
     */
    delete<T extends ItemTagDeleteArgs>(args: SelectSubset<T, ItemTagDeleteArgs<ExtArgs>>): Prisma__ItemTagClient<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemTag.
     * @param {ItemTagUpdateArgs} args - Arguments to update one ItemTag.
     * @example
     * // Update one ItemTag
     * const itemTag = await prisma.itemTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemTagUpdateArgs>(args: SelectSubset<T, ItemTagUpdateArgs<ExtArgs>>): Prisma__ItemTagClient<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemTags.
     * @param {ItemTagDeleteManyArgs} args - Arguments to filter ItemTags to delete.
     * @example
     * // Delete a few ItemTags
     * const { count } = await prisma.itemTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemTagDeleteManyArgs>(args?: SelectSubset<T, ItemTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemTags
     * const itemTag = await prisma.itemTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemTagUpdateManyArgs>(args: SelectSubset<T, ItemTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ItemTag.
     * @param {ItemTagUpsertArgs} args - Arguments to update or create a ItemTag.
     * @example
     * // Update or create a ItemTag
     * const itemTag = await prisma.itemTag.upsert({
     *   create: {
     *     // ... data to create a ItemTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemTag we want to update
     *   }
     * })
     */
    upsert<T extends ItemTagUpsertArgs>(args: SelectSubset<T, ItemTagUpsertArgs<ExtArgs>>): Prisma__ItemTagClient<$Result.GetResult<Prisma.$ItemTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemTagCountArgs} args - Arguments to filter ItemTags to count.
     * @example
     * // Count the number of ItemTags
     * const count = await prisma.itemTag.count({
     *   where: {
     *     // ... the filter for the ItemTags we want to count
     *   }
     * })
    **/
    count<T extends ItemTagCountArgs>(
      args?: Subset<T, ItemTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemTagAggregateArgs>(args: Subset<T, ItemTagAggregateArgs>): Prisma.PrismaPromise<GetItemTagAggregateType<T>>

    /**
     * Group by ItemTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemTagGroupByArgs['orderBy'] }
        : { orderBy?: ItemTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemTag model
   */
  readonly fields: ItemTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemTag model
   */
  interface ItemTagFieldRefs {
    readonly id: FieldRef<"ItemTag", 'Int'>
    readonly itemId: FieldRef<"ItemTag", 'Int'>
    readonly tagId: FieldRef<"ItemTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ItemTag findUnique
   */
  export type ItemTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    /**
     * Filter, which ItemTag to fetch.
     */
    where: ItemTagWhereUniqueInput
  }

  /**
   * ItemTag findUniqueOrThrow
   */
  export type ItemTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    /**
     * Filter, which ItemTag to fetch.
     */
    where: ItemTagWhereUniqueInput
  }

  /**
   * ItemTag findFirst
   */
  export type ItemTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    /**
     * Filter, which ItemTag to fetch.
     */
    where?: ItemTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemTags to fetch.
     */
    orderBy?: ItemTagOrderByWithRelationInput | ItemTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemTags.
     */
    cursor?: ItemTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemTags.
     */
    distinct?: ItemTagScalarFieldEnum | ItemTagScalarFieldEnum[]
  }

  /**
   * ItemTag findFirstOrThrow
   */
  export type ItemTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    /**
     * Filter, which ItemTag to fetch.
     */
    where?: ItemTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemTags to fetch.
     */
    orderBy?: ItemTagOrderByWithRelationInput | ItemTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemTags.
     */
    cursor?: ItemTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemTags.
     */
    distinct?: ItemTagScalarFieldEnum | ItemTagScalarFieldEnum[]
  }

  /**
   * ItemTag findMany
   */
  export type ItemTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    /**
     * Filter, which ItemTags to fetch.
     */
    where?: ItemTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemTags to fetch.
     */
    orderBy?: ItemTagOrderByWithRelationInput | ItemTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemTags.
     */
    cursor?: ItemTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemTags.
     */
    skip?: number
    distinct?: ItemTagScalarFieldEnum | ItemTagScalarFieldEnum[]
  }

  /**
   * ItemTag create
   */
  export type ItemTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemTag.
     */
    data: XOR<ItemTagCreateInput, ItemTagUncheckedCreateInput>
  }

  /**
   * ItemTag createMany
   */
  export type ItemTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemTags.
     */
    data: ItemTagCreateManyInput | ItemTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemTag update
   */
  export type ItemTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemTag.
     */
    data: XOR<ItemTagUpdateInput, ItemTagUncheckedUpdateInput>
    /**
     * Choose, which ItemTag to update.
     */
    where: ItemTagWhereUniqueInput
  }

  /**
   * ItemTag updateMany
   */
  export type ItemTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemTags.
     */
    data: XOR<ItemTagUpdateManyMutationInput, ItemTagUncheckedUpdateManyInput>
    /**
     * Filter which ItemTags to update
     */
    where?: ItemTagWhereInput
    /**
     * Limit how many ItemTags to update.
     */
    limit?: number
  }

  /**
   * ItemTag upsert
   */
  export type ItemTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemTag to update in case it exists.
     */
    where: ItemTagWhereUniqueInput
    /**
     * In case the ItemTag found by the `where` argument doesn't exist, create a new ItemTag with this data.
     */
    create: XOR<ItemTagCreateInput, ItemTagUncheckedCreateInput>
    /**
     * In case the ItemTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemTagUpdateInput, ItemTagUncheckedUpdateInput>
  }

  /**
   * ItemTag delete
   */
  export type ItemTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
    /**
     * Filter which ItemTag to delete.
     */
    where: ItemTagWhereUniqueInput
  }

  /**
   * ItemTag deleteMany
   */
  export type ItemTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemTags to delete
     */
    where?: ItemTagWhereInput
    /**
     * Limit how many ItemTags to delete.
     */
    limit?: number
  }

  /**
   * ItemTag without action
   */
  export type ItemTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemTag
     */
    select?: ItemTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemTag
     */
    omit?: ItemTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemTagInclude<ExtArgs> | null
  }


  /**
   * Model OutfitItem
   */

  export type AggregateOutfitItem = {
    _count: OutfitItemCountAggregateOutputType | null
    _avg: OutfitItemAvgAggregateOutputType | null
    _sum: OutfitItemSumAggregateOutputType | null
    _min: OutfitItemMinAggregateOutputType | null
    _max: OutfitItemMaxAggregateOutputType | null
  }

  export type OutfitItemAvgAggregateOutputType = {
    id: number | null
    outfitId: number | null
    itemId: number | null
  }

  export type OutfitItemSumAggregateOutputType = {
    id: number | null
    outfitId: number | null
    itemId: number | null
  }

  export type OutfitItemMinAggregateOutputType = {
    id: number | null
    outfitId: number | null
    itemId: number | null
  }

  export type OutfitItemMaxAggregateOutputType = {
    id: number | null
    outfitId: number | null
    itemId: number | null
  }

  export type OutfitItemCountAggregateOutputType = {
    id: number
    outfitId: number
    itemId: number
    _all: number
  }


  export type OutfitItemAvgAggregateInputType = {
    id?: true
    outfitId?: true
    itemId?: true
  }

  export type OutfitItemSumAggregateInputType = {
    id?: true
    outfitId?: true
    itemId?: true
  }

  export type OutfitItemMinAggregateInputType = {
    id?: true
    outfitId?: true
    itemId?: true
  }

  export type OutfitItemMaxAggregateInputType = {
    id?: true
    outfitId?: true
    itemId?: true
  }

  export type OutfitItemCountAggregateInputType = {
    id?: true
    outfitId?: true
    itemId?: true
    _all?: true
  }

  export type OutfitItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutfitItem to aggregate.
     */
    where?: OutfitItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitItems to fetch.
     */
    orderBy?: OutfitItemOrderByWithRelationInput | OutfitItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutfitItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutfitItems
    **/
    _count?: true | OutfitItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutfitItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutfitItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutfitItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutfitItemMaxAggregateInputType
  }

  export type GetOutfitItemAggregateType<T extends OutfitItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOutfitItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutfitItem[P]>
      : GetScalarType<T[P], AggregateOutfitItem[P]>
  }




  export type OutfitItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitItemWhereInput
    orderBy?: OutfitItemOrderByWithAggregationInput | OutfitItemOrderByWithAggregationInput[]
    by: OutfitItemScalarFieldEnum[] | OutfitItemScalarFieldEnum
    having?: OutfitItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutfitItemCountAggregateInputType | true
    _avg?: OutfitItemAvgAggregateInputType
    _sum?: OutfitItemSumAggregateInputType
    _min?: OutfitItemMinAggregateInputType
    _max?: OutfitItemMaxAggregateInputType
  }

  export type OutfitItemGroupByOutputType = {
    id: number
    outfitId: number
    itemId: number
    _count: OutfitItemCountAggregateOutputType | null
    _avg: OutfitItemAvgAggregateOutputType | null
    _sum: OutfitItemSumAggregateOutputType | null
    _min: OutfitItemMinAggregateOutputType | null
    _max: OutfitItemMaxAggregateOutputType | null
  }

  type GetOutfitItemGroupByPayload<T extends OutfitItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutfitItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutfitItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutfitItemGroupByOutputType[P]>
            : GetScalarType<T[P], OutfitItemGroupByOutputType[P]>
        }
      >
    >


  export type OutfitItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outfitId?: boolean
    itemId?: boolean
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfitItem"]>



  export type OutfitItemSelectScalar = {
    id?: boolean
    outfitId?: boolean
    itemId?: boolean
  }

  export type OutfitItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "outfitId" | "itemId", ExtArgs["result"]["outfitItem"]>
  export type OutfitItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $OutfitItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutfitItem"
    objects: {
      outfit: Prisma.$OutfitPayload<ExtArgs>
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      outfitId: number
      itemId: number
    }, ExtArgs["result"]["outfitItem"]>
    composites: {}
  }

  type OutfitItemGetPayload<S extends boolean | null | undefined | OutfitItemDefaultArgs> = $Result.GetResult<Prisma.$OutfitItemPayload, S>

  type OutfitItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutfitItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutfitItemCountAggregateInputType | true
    }

  export interface OutfitItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutfitItem'], meta: { name: 'OutfitItem' } }
    /**
     * Find zero or one OutfitItem that matches the filter.
     * @param {OutfitItemFindUniqueArgs} args - Arguments to find a OutfitItem
     * @example
     * // Get one OutfitItem
     * const outfitItem = await prisma.outfitItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutfitItemFindUniqueArgs>(args: SelectSubset<T, OutfitItemFindUniqueArgs<ExtArgs>>): Prisma__OutfitItemClient<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OutfitItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutfitItemFindUniqueOrThrowArgs} args - Arguments to find a OutfitItem
     * @example
     * // Get one OutfitItem
     * const outfitItem = await prisma.outfitItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutfitItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OutfitItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutfitItemClient<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutfitItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitItemFindFirstArgs} args - Arguments to find a OutfitItem
     * @example
     * // Get one OutfitItem
     * const outfitItem = await prisma.outfitItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutfitItemFindFirstArgs>(args?: SelectSubset<T, OutfitItemFindFirstArgs<ExtArgs>>): Prisma__OutfitItemClient<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutfitItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitItemFindFirstOrThrowArgs} args - Arguments to find a OutfitItem
     * @example
     * // Get one OutfitItem
     * const outfitItem = await prisma.outfitItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutfitItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OutfitItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutfitItemClient<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OutfitItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutfitItems
     * const outfitItems = await prisma.outfitItem.findMany()
     * 
     * // Get first 10 OutfitItems
     * const outfitItems = await prisma.outfitItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outfitItemWithIdOnly = await prisma.outfitItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutfitItemFindManyArgs>(args?: SelectSubset<T, OutfitItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OutfitItem.
     * @param {OutfitItemCreateArgs} args - Arguments to create a OutfitItem.
     * @example
     * // Create one OutfitItem
     * const OutfitItem = await prisma.outfitItem.create({
     *   data: {
     *     // ... data to create a OutfitItem
     *   }
     * })
     * 
     */
    create<T extends OutfitItemCreateArgs>(args: SelectSubset<T, OutfitItemCreateArgs<ExtArgs>>): Prisma__OutfitItemClient<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OutfitItems.
     * @param {OutfitItemCreateManyArgs} args - Arguments to create many OutfitItems.
     * @example
     * // Create many OutfitItems
     * const outfitItem = await prisma.outfitItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutfitItemCreateManyArgs>(args?: SelectSubset<T, OutfitItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OutfitItem.
     * @param {OutfitItemDeleteArgs} args - Arguments to delete one OutfitItem.
     * @example
     * // Delete one OutfitItem
     * const OutfitItem = await prisma.outfitItem.delete({
     *   where: {
     *     // ... filter to delete one OutfitItem
     *   }
     * })
     * 
     */
    delete<T extends OutfitItemDeleteArgs>(args: SelectSubset<T, OutfitItemDeleteArgs<ExtArgs>>): Prisma__OutfitItemClient<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OutfitItem.
     * @param {OutfitItemUpdateArgs} args - Arguments to update one OutfitItem.
     * @example
     * // Update one OutfitItem
     * const outfitItem = await prisma.outfitItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutfitItemUpdateArgs>(args: SelectSubset<T, OutfitItemUpdateArgs<ExtArgs>>): Prisma__OutfitItemClient<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OutfitItems.
     * @param {OutfitItemDeleteManyArgs} args - Arguments to filter OutfitItems to delete.
     * @example
     * // Delete a few OutfitItems
     * const { count } = await prisma.outfitItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutfitItemDeleteManyArgs>(args?: SelectSubset<T, OutfitItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutfitItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutfitItems
     * const outfitItem = await prisma.outfitItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutfitItemUpdateManyArgs>(args: SelectSubset<T, OutfitItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OutfitItem.
     * @param {OutfitItemUpsertArgs} args - Arguments to update or create a OutfitItem.
     * @example
     * // Update or create a OutfitItem
     * const outfitItem = await prisma.outfitItem.upsert({
     *   create: {
     *     // ... data to create a OutfitItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutfitItem we want to update
     *   }
     * })
     */
    upsert<T extends OutfitItemUpsertArgs>(args: SelectSubset<T, OutfitItemUpsertArgs<ExtArgs>>): Prisma__OutfitItemClient<$Result.GetResult<Prisma.$OutfitItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OutfitItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitItemCountArgs} args - Arguments to filter OutfitItems to count.
     * @example
     * // Count the number of OutfitItems
     * const count = await prisma.outfitItem.count({
     *   where: {
     *     // ... the filter for the OutfitItems we want to count
     *   }
     * })
    **/
    count<T extends OutfitItemCountArgs>(
      args?: Subset<T, OutfitItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutfitItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutfitItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutfitItemAggregateArgs>(args: Subset<T, OutfitItemAggregateArgs>): Prisma.PrismaPromise<GetOutfitItemAggregateType<T>>

    /**
     * Group by OutfitItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutfitItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutfitItemGroupByArgs['orderBy'] }
        : { orderBy?: OutfitItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutfitItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutfitItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutfitItem model
   */
  readonly fields: OutfitItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutfitItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutfitItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    outfit<T extends OutfitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OutfitDefaultArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OutfitItem model
   */
  interface OutfitItemFieldRefs {
    readonly id: FieldRef<"OutfitItem", 'Int'>
    readonly outfitId: FieldRef<"OutfitItem", 'Int'>
    readonly itemId: FieldRef<"OutfitItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OutfitItem findUnique
   */
  export type OutfitItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    /**
     * Filter, which OutfitItem to fetch.
     */
    where: OutfitItemWhereUniqueInput
  }

  /**
   * OutfitItem findUniqueOrThrow
   */
  export type OutfitItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    /**
     * Filter, which OutfitItem to fetch.
     */
    where: OutfitItemWhereUniqueInput
  }

  /**
   * OutfitItem findFirst
   */
  export type OutfitItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    /**
     * Filter, which OutfitItem to fetch.
     */
    where?: OutfitItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitItems to fetch.
     */
    orderBy?: OutfitItemOrderByWithRelationInput | OutfitItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutfitItems.
     */
    cursor?: OutfitItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutfitItems.
     */
    distinct?: OutfitItemScalarFieldEnum | OutfitItemScalarFieldEnum[]
  }

  /**
   * OutfitItem findFirstOrThrow
   */
  export type OutfitItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    /**
     * Filter, which OutfitItem to fetch.
     */
    where?: OutfitItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitItems to fetch.
     */
    orderBy?: OutfitItemOrderByWithRelationInput | OutfitItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutfitItems.
     */
    cursor?: OutfitItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutfitItems.
     */
    distinct?: OutfitItemScalarFieldEnum | OutfitItemScalarFieldEnum[]
  }

  /**
   * OutfitItem findMany
   */
  export type OutfitItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    /**
     * Filter, which OutfitItems to fetch.
     */
    where?: OutfitItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitItems to fetch.
     */
    orderBy?: OutfitItemOrderByWithRelationInput | OutfitItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutfitItems.
     */
    cursor?: OutfitItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitItems.
     */
    skip?: number
    distinct?: OutfitItemScalarFieldEnum | OutfitItemScalarFieldEnum[]
  }

  /**
   * OutfitItem create
   */
  export type OutfitItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OutfitItem.
     */
    data: XOR<OutfitItemCreateInput, OutfitItemUncheckedCreateInput>
  }

  /**
   * OutfitItem createMany
   */
  export type OutfitItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutfitItems.
     */
    data: OutfitItemCreateManyInput | OutfitItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutfitItem update
   */
  export type OutfitItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OutfitItem.
     */
    data: XOR<OutfitItemUpdateInput, OutfitItemUncheckedUpdateInput>
    /**
     * Choose, which OutfitItem to update.
     */
    where: OutfitItemWhereUniqueInput
  }

  /**
   * OutfitItem updateMany
   */
  export type OutfitItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutfitItems.
     */
    data: XOR<OutfitItemUpdateManyMutationInput, OutfitItemUncheckedUpdateManyInput>
    /**
     * Filter which OutfitItems to update
     */
    where?: OutfitItemWhereInput
    /**
     * Limit how many OutfitItems to update.
     */
    limit?: number
  }

  /**
   * OutfitItem upsert
   */
  export type OutfitItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OutfitItem to update in case it exists.
     */
    where: OutfitItemWhereUniqueInput
    /**
     * In case the OutfitItem found by the `where` argument doesn't exist, create a new OutfitItem with this data.
     */
    create: XOR<OutfitItemCreateInput, OutfitItemUncheckedCreateInput>
    /**
     * In case the OutfitItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutfitItemUpdateInput, OutfitItemUncheckedUpdateInput>
  }

  /**
   * OutfitItem delete
   */
  export type OutfitItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
    /**
     * Filter which OutfitItem to delete.
     */
    where: OutfitItemWhereUniqueInput
  }

  /**
   * OutfitItem deleteMany
   */
  export type OutfitItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutfitItems to delete
     */
    where?: OutfitItemWhereInput
    /**
     * Limit how many OutfitItems to delete.
     */
    limit?: number
  }

  /**
   * OutfitItem without action
   */
  export type OutfitItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitItem
     */
    select?: OutfitItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitItem
     */
    omit?: OutfitItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitItemInclude<ExtArgs> | null
  }


  /**
   * Model OutfitTag
   */

  export type AggregateOutfitTag = {
    _count: OutfitTagCountAggregateOutputType | null
    _avg: OutfitTagAvgAggregateOutputType | null
    _sum: OutfitTagSumAggregateOutputType | null
    _min: OutfitTagMinAggregateOutputType | null
    _max: OutfitTagMaxAggregateOutputType | null
  }

  export type OutfitTagAvgAggregateOutputType = {
    id: number | null
    outfitId: number | null
    tagId: number | null
  }

  export type OutfitTagSumAggregateOutputType = {
    id: number | null
    outfitId: number | null
    tagId: number | null
  }

  export type OutfitTagMinAggregateOutputType = {
    id: number | null
    outfitId: number | null
    tagId: number | null
  }

  export type OutfitTagMaxAggregateOutputType = {
    id: number | null
    outfitId: number | null
    tagId: number | null
  }

  export type OutfitTagCountAggregateOutputType = {
    id: number
    outfitId: number
    tagId: number
    _all: number
  }


  export type OutfitTagAvgAggregateInputType = {
    id?: true
    outfitId?: true
    tagId?: true
  }

  export type OutfitTagSumAggregateInputType = {
    id?: true
    outfitId?: true
    tagId?: true
  }

  export type OutfitTagMinAggregateInputType = {
    id?: true
    outfitId?: true
    tagId?: true
  }

  export type OutfitTagMaxAggregateInputType = {
    id?: true
    outfitId?: true
    tagId?: true
  }

  export type OutfitTagCountAggregateInputType = {
    id?: true
    outfitId?: true
    tagId?: true
    _all?: true
  }

  export type OutfitTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutfitTag to aggregate.
     */
    where?: OutfitTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitTags to fetch.
     */
    orderBy?: OutfitTagOrderByWithRelationInput | OutfitTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutfitTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutfitTags
    **/
    _count?: true | OutfitTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutfitTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutfitTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutfitTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutfitTagMaxAggregateInputType
  }

  export type GetOutfitTagAggregateType<T extends OutfitTagAggregateArgs> = {
        [P in keyof T & keyof AggregateOutfitTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutfitTag[P]>
      : GetScalarType<T[P], AggregateOutfitTag[P]>
  }




  export type OutfitTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitTagWhereInput
    orderBy?: OutfitTagOrderByWithAggregationInput | OutfitTagOrderByWithAggregationInput[]
    by: OutfitTagScalarFieldEnum[] | OutfitTagScalarFieldEnum
    having?: OutfitTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutfitTagCountAggregateInputType | true
    _avg?: OutfitTagAvgAggregateInputType
    _sum?: OutfitTagSumAggregateInputType
    _min?: OutfitTagMinAggregateInputType
    _max?: OutfitTagMaxAggregateInputType
  }

  export type OutfitTagGroupByOutputType = {
    id: number
    outfitId: number
    tagId: number
    _count: OutfitTagCountAggregateOutputType | null
    _avg: OutfitTagAvgAggregateOutputType | null
    _sum: OutfitTagSumAggregateOutputType | null
    _min: OutfitTagMinAggregateOutputType | null
    _max: OutfitTagMaxAggregateOutputType | null
  }

  type GetOutfitTagGroupByPayload<T extends OutfitTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutfitTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutfitTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutfitTagGroupByOutputType[P]>
            : GetScalarType<T[P], OutfitTagGroupByOutputType[P]>
        }
      >
    >


  export type OutfitTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outfitId?: boolean
    tagId?: boolean
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfitTag"]>



  export type OutfitTagSelectScalar = {
    id?: boolean
    outfitId?: boolean
    tagId?: boolean
  }

  export type OutfitTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "outfitId" | "tagId", ExtArgs["result"]["outfitTag"]>
  export type OutfitTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $OutfitTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutfitTag"
    objects: {
      outfit: Prisma.$OutfitPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      outfitId: number
      tagId: number
    }, ExtArgs["result"]["outfitTag"]>
    composites: {}
  }

  type OutfitTagGetPayload<S extends boolean | null | undefined | OutfitTagDefaultArgs> = $Result.GetResult<Prisma.$OutfitTagPayload, S>

  type OutfitTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutfitTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutfitTagCountAggregateInputType | true
    }

  export interface OutfitTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutfitTag'], meta: { name: 'OutfitTag' } }
    /**
     * Find zero or one OutfitTag that matches the filter.
     * @param {OutfitTagFindUniqueArgs} args - Arguments to find a OutfitTag
     * @example
     * // Get one OutfitTag
     * const outfitTag = await prisma.outfitTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutfitTagFindUniqueArgs>(args: SelectSubset<T, OutfitTagFindUniqueArgs<ExtArgs>>): Prisma__OutfitTagClient<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OutfitTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutfitTagFindUniqueOrThrowArgs} args - Arguments to find a OutfitTag
     * @example
     * // Get one OutfitTag
     * const outfitTag = await prisma.outfitTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutfitTagFindUniqueOrThrowArgs>(args: SelectSubset<T, OutfitTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutfitTagClient<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutfitTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitTagFindFirstArgs} args - Arguments to find a OutfitTag
     * @example
     * // Get one OutfitTag
     * const outfitTag = await prisma.outfitTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutfitTagFindFirstArgs>(args?: SelectSubset<T, OutfitTagFindFirstArgs<ExtArgs>>): Prisma__OutfitTagClient<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutfitTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitTagFindFirstOrThrowArgs} args - Arguments to find a OutfitTag
     * @example
     * // Get one OutfitTag
     * const outfitTag = await prisma.outfitTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutfitTagFindFirstOrThrowArgs>(args?: SelectSubset<T, OutfitTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutfitTagClient<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OutfitTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutfitTags
     * const outfitTags = await prisma.outfitTag.findMany()
     * 
     * // Get first 10 OutfitTags
     * const outfitTags = await prisma.outfitTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outfitTagWithIdOnly = await prisma.outfitTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutfitTagFindManyArgs>(args?: SelectSubset<T, OutfitTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OutfitTag.
     * @param {OutfitTagCreateArgs} args - Arguments to create a OutfitTag.
     * @example
     * // Create one OutfitTag
     * const OutfitTag = await prisma.outfitTag.create({
     *   data: {
     *     // ... data to create a OutfitTag
     *   }
     * })
     * 
     */
    create<T extends OutfitTagCreateArgs>(args: SelectSubset<T, OutfitTagCreateArgs<ExtArgs>>): Prisma__OutfitTagClient<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OutfitTags.
     * @param {OutfitTagCreateManyArgs} args - Arguments to create many OutfitTags.
     * @example
     * // Create many OutfitTags
     * const outfitTag = await prisma.outfitTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutfitTagCreateManyArgs>(args?: SelectSubset<T, OutfitTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OutfitTag.
     * @param {OutfitTagDeleteArgs} args - Arguments to delete one OutfitTag.
     * @example
     * // Delete one OutfitTag
     * const OutfitTag = await prisma.outfitTag.delete({
     *   where: {
     *     // ... filter to delete one OutfitTag
     *   }
     * })
     * 
     */
    delete<T extends OutfitTagDeleteArgs>(args: SelectSubset<T, OutfitTagDeleteArgs<ExtArgs>>): Prisma__OutfitTagClient<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OutfitTag.
     * @param {OutfitTagUpdateArgs} args - Arguments to update one OutfitTag.
     * @example
     * // Update one OutfitTag
     * const outfitTag = await prisma.outfitTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutfitTagUpdateArgs>(args: SelectSubset<T, OutfitTagUpdateArgs<ExtArgs>>): Prisma__OutfitTagClient<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OutfitTags.
     * @param {OutfitTagDeleteManyArgs} args - Arguments to filter OutfitTags to delete.
     * @example
     * // Delete a few OutfitTags
     * const { count } = await prisma.outfitTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutfitTagDeleteManyArgs>(args?: SelectSubset<T, OutfitTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutfitTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutfitTags
     * const outfitTag = await prisma.outfitTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutfitTagUpdateManyArgs>(args: SelectSubset<T, OutfitTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OutfitTag.
     * @param {OutfitTagUpsertArgs} args - Arguments to update or create a OutfitTag.
     * @example
     * // Update or create a OutfitTag
     * const outfitTag = await prisma.outfitTag.upsert({
     *   create: {
     *     // ... data to create a OutfitTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutfitTag we want to update
     *   }
     * })
     */
    upsert<T extends OutfitTagUpsertArgs>(args: SelectSubset<T, OutfitTagUpsertArgs<ExtArgs>>): Prisma__OutfitTagClient<$Result.GetResult<Prisma.$OutfitTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OutfitTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitTagCountArgs} args - Arguments to filter OutfitTags to count.
     * @example
     * // Count the number of OutfitTags
     * const count = await prisma.outfitTag.count({
     *   where: {
     *     // ... the filter for the OutfitTags we want to count
     *   }
     * })
    **/
    count<T extends OutfitTagCountArgs>(
      args?: Subset<T, OutfitTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutfitTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutfitTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutfitTagAggregateArgs>(args: Subset<T, OutfitTagAggregateArgs>): Prisma.PrismaPromise<GetOutfitTagAggregateType<T>>

    /**
     * Group by OutfitTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutfitTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutfitTagGroupByArgs['orderBy'] }
        : { orderBy?: OutfitTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutfitTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutfitTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutfitTag model
   */
  readonly fields: OutfitTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutfitTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutfitTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    outfit<T extends OutfitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OutfitDefaultArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OutfitTag model
   */
  interface OutfitTagFieldRefs {
    readonly id: FieldRef<"OutfitTag", 'Int'>
    readonly outfitId: FieldRef<"OutfitTag", 'Int'>
    readonly tagId: FieldRef<"OutfitTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OutfitTag findUnique
   */
  export type OutfitTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    /**
     * Filter, which OutfitTag to fetch.
     */
    where: OutfitTagWhereUniqueInput
  }

  /**
   * OutfitTag findUniqueOrThrow
   */
  export type OutfitTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    /**
     * Filter, which OutfitTag to fetch.
     */
    where: OutfitTagWhereUniqueInput
  }

  /**
   * OutfitTag findFirst
   */
  export type OutfitTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    /**
     * Filter, which OutfitTag to fetch.
     */
    where?: OutfitTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitTags to fetch.
     */
    orderBy?: OutfitTagOrderByWithRelationInput | OutfitTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutfitTags.
     */
    cursor?: OutfitTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutfitTags.
     */
    distinct?: OutfitTagScalarFieldEnum | OutfitTagScalarFieldEnum[]
  }

  /**
   * OutfitTag findFirstOrThrow
   */
  export type OutfitTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    /**
     * Filter, which OutfitTag to fetch.
     */
    where?: OutfitTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitTags to fetch.
     */
    orderBy?: OutfitTagOrderByWithRelationInput | OutfitTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutfitTags.
     */
    cursor?: OutfitTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutfitTags.
     */
    distinct?: OutfitTagScalarFieldEnum | OutfitTagScalarFieldEnum[]
  }

  /**
   * OutfitTag findMany
   */
  export type OutfitTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    /**
     * Filter, which OutfitTags to fetch.
     */
    where?: OutfitTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitTags to fetch.
     */
    orderBy?: OutfitTagOrderByWithRelationInput | OutfitTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutfitTags.
     */
    cursor?: OutfitTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitTags.
     */
    skip?: number
    distinct?: OutfitTagScalarFieldEnum | OutfitTagScalarFieldEnum[]
  }

  /**
   * OutfitTag create
   */
  export type OutfitTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    /**
     * The data needed to create a OutfitTag.
     */
    data: XOR<OutfitTagCreateInput, OutfitTagUncheckedCreateInput>
  }

  /**
   * OutfitTag createMany
   */
  export type OutfitTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutfitTags.
     */
    data: OutfitTagCreateManyInput | OutfitTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutfitTag update
   */
  export type OutfitTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    /**
     * The data needed to update a OutfitTag.
     */
    data: XOR<OutfitTagUpdateInput, OutfitTagUncheckedUpdateInput>
    /**
     * Choose, which OutfitTag to update.
     */
    where: OutfitTagWhereUniqueInput
  }

  /**
   * OutfitTag updateMany
   */
  export type OutfitTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutfitTags.
     */
    data: XOR<OutfitTagUpdateManyMutationInput, OutfitTagUncheckedUpdateManyInput>
    /**
     * Filter which OutfitTags to update
     */
    where?: OutfitTagWhereInput
    /**
     * Limit how many OutfitTags to update.
     */
    limit?: number
  }

  /**
   * OutfitTag upsert
   */
  export type OutfitTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    /**
     * The filter to search for the OutfitTag to update in case it exists.
     */
    where: OutfitTagWhereUniqueInput
    /**
     * In case the OutfitTag found by the `where` argument doesn't exist, create a new OutfitTag with this data.
     */
    create: XOR<OutfitTagCreateInput, OutfitTagUncheckedCreateInput>
    /**
     * In case the OutfitTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutfitTagUpdateInput, OutfitTagUncheckedUpdateInput>
  }

  /**
   * OutfitTag delete
   */
  export type OutfitTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
    /**
     * Filter which OutfitTag to delete.
     */
    where: OutfitTagWhereUniqueInput
  }

  /**
   * OutfitTag deleteMany
   */
  export type OutfitTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutfitTags to delete
     */
    where?: OutfitTagWhereInput
    /**
     * Limit how many OutfitTags to delete.
     */
    limit?: number
  }

  /**
   * OutfitTag without action
   */
  export type OutfitTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitTag
     */
    select?: OutfitTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitTag
     */
    omit?: OutfitTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitTagInclude<ExtArgs> | null
  }


  /**
   * Model OutfitLike
   */

  export type AggregateOutfitLike = {
    _count: OutfitLikeCountAggregateOutputType | null
    _avg: OutfitLikeAvgAggregateOutputType | null
    _sum: OutfitLikeSumAggregateOutputType | null
    _min: OutfitLikeMinAggregateOutputType | null
    _max: OutfitLikeMaxAggregateOutputType | null
  }

  export type OutfitLikeAvgAggregateOutputType = {
    id: number | null
    outfitId: number | null
    userId: number | null
  }

  export type OutfitLikeSumAggregateOutputType = {
    id: number | null
    outfitId: number | null
    userId: number | null
  }

  export type OutfitLikeMinAggregateOutputType = {
    id: number | null
    outfitId: number | null
    userId: number | null
  }

  export type OutfitLikeMaxAggregateOutputType = {
    id: number | null
    outfitId: number | null
    userId: number | null
  }

  export type OutfitLikeCountAggregateOutputType = {
    id: number
    outfitId: number
    userId: number
    _all: number
  }


  export type OutfitLikeAvgAggregateInputType = {
    id?: true
    outfitId?: true
    userId?: true
  }

  export type OutfitLikeSumAggregateInputType = {
    id?: true
    outfitId?: true
    userId?: true
  }

  export type OutfitLikeMinAggregateInputType = {
    id?: true
    outfitId?: true
    userId?: true
  }

  export type OutfitLikeMaxAggregateInputType = {
    id?: true
    outfitId?: true
    userId?: true
  }

  export type OutfitLikeCountAggregateInputType = {
    id?: true
    outfitId?: true
    userId?: true
    _all?: true
  }

  export type OutfitLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutfitLike to aggregate.
     */
    where?: OutfitLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitLikes to fetch.
     */
    orderBy?: OutfitLikeOrderByWithRelationInput | OutfitLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutfitLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutfitLikes
    **/
    _count?: true | OutfitLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutfitLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutfitLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutfitLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutfitLikeMaxAggregateInputType
  }

  export type GetOutfitLikeAggregateType<T extends OutfitLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateOutfitLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutfitLike[P]>
      : GetScalarType<T[P], AggregateOutfitLike[P]>
  }




  export type OutfitLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutfitLikeWhereInput
    orderBy?: OutfitLikeOrderByWithAggregationInput | OutfitLikeOrderByWithAggregationInput[]
    by: OutfitLikeScalarFieldEnum[] | OutfitLikeScalarFieldEnum
    having?: OutfitLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutfitLikeCountAggregateInputType | true
    _avg?: OutfitLikeAvgAggregateInputType
    _sum?: OutfitLikeSumAggregateInputType
    _min?: OutfitLikeMinAggregateInputType
    _max?: OutfitLikeMaxAggregateInputType
  }

  export type OutfitLikeGroupByOutputType = {
    id: number
    outfitId: number
    userId: number
    _count: OutfitLikeCountAggregateOutputType | null
    _avg: OutfitLikeAvgAggregateOutputType | null
    _sum: OutfitLikeSumAggregateOutputType | null
    _min: OutfitLikeMinAggregateOutputType | null
    _max: OutfitLikeMaxAggregateOutputType | null
  }

  type GetOutfitLikeGroupByPayload<T extends OutfitLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutfitLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutfitLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutfitLikeGroupByOutputType[P]>
            : GetScalarType<T[P], OutfitLikeGroupByOutputType[P]>
        }
      >
    >


  export type OutfitLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outfitId?: boolean
    userId?: boolean
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outfitLike"]>



  export type OutfitLikeSelectScalar = {
    id?: boolean
    outfitId?: boolean
    userId?: boolean
  }

  export type OutfitLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "outfitId" | "userId", ExtArgs["result"]["outfitLike"]>
  export type OutfitLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outfit?: boolean | OutfitDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OutfitLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutfitLike"
    objects: {
      outfit: Prisma.$OutfitPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      outfitId: number
      userId: number
    }, ExtArgs["result"]["outfitLike"]>
    composites: {}
  }

  type OutfitLikeGetPayload<S extends boolean | null | undefined | OutfitLikeDefaultArgs> = $Result.GetResult<Prisma.$OutfitLikePayload, S>

  type OutfitLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutfitLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutfitLikeCountAggregateInputType | true
    }

  export interface OutfitLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutfitLike'], meta: { name: 'OutfitLike' } }
    /**
     * Find zero or one OutfitLike that matches the filter.
     * @param {OutfitLikeFindUniqueArgs} args - Arguments to find a OutfitLike
     * @example
     * // Get one OutfitLike
     * const outfitLike = await prisma.outfitLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutfitLikeFindUniqueArgs>(args: SelectSubset<T, OutfitLikeFindUniqueArgs<ExtArgs>>): Prisma__OutfitLikeClient<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OutfitLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutfitLikeFindUniqueOrThrowArgs} args - Arguments to find a OutfitLike
     * @example
     * // Get one OutfitLike
     * const outfitLike = await prisma.outfitLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutfitLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, OutfitLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutfitLikeClient<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutfitLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitLikeFindFirstArgs} args - Arguments to find a OutfitLike
     * @example
     * // Get one OutfitLike
     * const outfitLike = await prisma.outfitLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutfitLikeFindFirstArgs>(args?: SelectSubset<T, OutfitLikeFindFirstArgs<ExtArgs>>): Prisma__OutfitLikeClient<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutfitLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitLikeFindFirstOrThrowArgs} args - Arguments to find a OutfitLike
     * @example
     * // Get one OutfitLike
     * const outfitLike = await prisma.outfitLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutfitLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, OutfitLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutfitLikeClient<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OutfitLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutfitLikes
     * const outfitLikes = await prisma.outfitLike.findMany()
     * 
     * // Get first 10 OutfitLikes
     * const outfitLikes = await prisma.outfitLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outfitLikeWithIdOnly = await prisma.outfitLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutfitLikeFindManyArgs>(args?: SelectSubset<T, OutfitLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OutfitLike.
     * @param {OutfitLikeCreateArgs} args - Arguments to create a OutfitLike.
     * @example
     * // Create one OutfitLike
     * const OutfitLike = await prisma.outfitLike.create({
     *   data: {
     *     // ... data to create a OutfitLike
     *   }
     * })
     * 
     */
    create<T extends OutfitLikeCreateArgs>(args: SelectSubset<T, OutfitLikeCreateArgs<ExtArgs>>): Prisma__OutfitLikeClient<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OutfitLikes.
     * @param {OutfitLikeCreateManyArgs} args - Arguments to create many OutfitLikes.
     * @example
     * // Create many OutfitLikes
     * const outfitLike = await prisma.outfitLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutfitLikeCreateManyArgs>(args?: SelectSubset<T, OutfitLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OutfitLike.
     * @param {OutfitLikeDeleteArgs} args - Arguments to delete one OutfitLike.
     * @example
     * // Delete one OutfitLike
     * const OutfitLike = await prisma.outfitLike.delete({
     *   where: {
     *     // ... filter to delete one OutfitLike
     *   }
     * })
     * 
     */
    delete<T extends OutfitLikeDeleteArgs>(args: SelectSubset<T, OutfitLikeDeleteArgs<ExtArgs>>): Prisma__OutfitLikeClient<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OutfitLike.
     * @param {OutfitLikeUpdateArgs} args - Arguments to update one OutfitLike.
     * @example
     * // Update one OutfitLike
     * const outfitLike = await prisma.outfitLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutfitLikeUpdateArgs>(args: SelectSubset<T, OutfitLikeUpdateArgs<ExtArgs>>): Prisma__OutfitLikeClient<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OutfitLikes.
     * @param {OutfitLikeDeleteManyArgs} args - Arguments to filter OutfitLikes to delete.
     * @example
     * // Delete a few OutfitLikes
     * const { count } = await prisma.outfitLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutfitLikeDeleteManyArgs>(args?: SelectSubset<T, OutfitLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutfitLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutfitLikes
     * const outfitLike = await prisma.outfitLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutfitLikeUpdateManyArgs>(args: SelectSubset<T, OutfitLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OutfitLike.
     * @param {OutfitLikeUpsertArgs} args - Arguments to update or create a OutfitLike.
     * @example
     * // Update or create a OutfitLike
     * const outfitLike = await prisma.outfitLike.upsert({
     *   create: {
     *     // ... data to create a OutfitLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutfitLike we want to update
     *   }
     * })
     */
    upsert<T extends OutfitLikeUpsertArgs>(args: SelectSubset<T, OutfitLikeUpsertArgs<ExtArgs>>): Prisma__OutfitLikeClient<$Result.GetResult<Prisma.$OutfitLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OutfitLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitLikeCountArgs} args - Arguments to filter OutfitLikes to count.
     * @example
     * // Count the number of OutfitLikes
     * const count = await prisma.outfitLike.count({
     *   where: {
     *     // ... the filter for the OutfitLikes we want to count
     *   }
     * })
    **/
    count<T extends OutfitLikeCountArgs>(
      args?: Subset<T, OutfitLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutfitLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutfitLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutfitLikeAggregateArgs>(args: Subset<T, OutfitLikeAggregateArgs>): Prisma.PrismaPromise<GetOutfitLikeAggregateType<T>>

    /**
     * Group by OutfitLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutfitLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutfitLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutfitLikeGroupByArgs['orderBy'] }
        : { orderBy?: OutfitLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
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
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutfitLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutfitLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutfitLike model
   */
  readonly fields: OutfitLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutfitLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutfitLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    outfit<T extends OutfitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OutfitDefaultArgs<ExtArgs>>): Prisma__OutfitClient<$Result.GetResult<Prisma.$OutfitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OutfitLike model
   */
  interface OutfitLikeFieldRefs {
    readonly id: FieldRef<"OutfitLike", 'Int'>
    readonly outfitId: FieldRef<"OutfitLike", 'Int'>
    readonly userId: FieldRef<"OutfitLike", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OutfitLike findUnique
   */
  export type OutfitLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    /**
     * Filter, which OutfitLike to fetch.
     */
    where: OutfitLikeWhereUniqueInput
  }

  /**
   * OutfitLike findUniqueOrThrow
   */
  export type OutfitLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    /**
     * Filter, which OutfitLike to fetch.
     */
    where: OutfitLikeWhereUniqueInput
  }

  /**
   * OutfitLike findFirst
   */
  export type OutfitLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    /**
     * Filter, which OutfitLike to fetch.
     */
    where?: OutfitLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitLikes to fetch.
     */
    orderBy?: OutfitLikeOrderByWithRelationInput | OutfitLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutfitLikes.
     */
    cursor?: OutfitLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutfitLikes.
     */
    distinct?: OutfitLikeScalarFieldEnum | OutfitLikeScalarFieldEnum[]
  }

  /**
   * OutfitLike findFirstOrThrow
   */
  export type OutfitLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    /**
     * Filter, which OutfitLike to fetch.
     */
    where?: OutfitLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitLikes to fetch.
     */
    orderBy?: OutfitLikeOrderByWithRelationInput | OutfitLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutfitLikes.
     */
    cursor?: OutfitLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutfitLikes.
     */
    distinct?: OutfitLikeScalarFieldEnum | OutfitLikeScalarFieldEnum[]
  }

  /**
   * OutfitLike findMany
   */
  export type OutfitLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    /**
     * Filter, which OutfitLikes to fetch.
     */
    where?: OutfitLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutfitLikes to fetch.
     */
    orderBy?: OutfitLikeOrderByWithRelationInput | OutfitLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutfitLikes.
     */
    cursor?: OutfitLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutfitLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutfitLikes.
     */
    skip?: number
    distinct?: OutfitLikeScalarFieldEnum | OutfitLikeScalarFieldEnum[]
  }

  /**
   * OutfitLike create
   */
  export type OutfitLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a OutfitLike.
     */
    data: XOR<OutfitLikeCreateInput, OutfitLikeUncheckedCreateInput>
  }

  /**
   * OutfitLike createMany
   */
  export type OutfitLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutfitLikes.
     */
    data: OutfitLikeCreateManyInput | OutfitLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutfitLike update
   */
  export type OutfitLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a OutfitLike.
     */
    data: XOR<OutfitLikeUpdateInput, OutfitLikeUncheckedUpdateInput>
    /**
     * Choose, which OutfitLike to update.
     */
    where: OutfitLikeWhereUniqueInput
  }

  /**
   * OutfitLike updateMany
   */
  export type OutfitLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutfitLikes.
     */
    data: XOR<OutfitLikeUpdateManyMutationInput, OutfitLikeUncheckedUpdateManyInput>
    /**
     * Filter which OutfitLikes to update
     */
    where?: OutfitLikeWhereInput
    /**
     * Limit how many OutfitLikes to update.
     */
    limit?: number
  }

  /**
   * OutfitLike upsert
   */
  export type OutfitLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the OutfitLike to update in case it exists.
     */
    where: OutfitLikeWhereUniqueInput
    /**
     * In case the OutfitLike found by the `where` argument doesn't exist, create a new OutfitLike with this data.
     */
    create: XOR<OutfitLikeCreateInput, OutfitLikeUncheckedCreateInput>
    /**
     * In case the OutfitLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutfitLikeUpdateInput, OutfitLikeUncheckedUpdateInput>
  }

  /**
   * OutfitLike delete
   */
  export type OutfitLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
    /**
     * Filter which OutfitLike to delete.
     */
    where: OutfitLikeWhereUniqueInput
  }

  /**
   * OutfitLike deleteMany
   */
  export type OutfitLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutfitLikes to delete
     */
    where?: OutfitLikeWhereInput
    /**
     * Limit how many OutfitLikes to delete.
     */
    limit?: number
  }

  /**
   * OutfitLike without action
   */
  export type OutfitLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutfitLike
     */
    select?: OutfitLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutfitLike
     */
    omit?: OutfitLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutfitLikeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    nickname: 'nickname',
    profileImage: 'profileImage'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ItemScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    category: 'category',
    subcategory: 'subcategory',
    brand: 'brand',
    color: 'color',
    size: 'size',
    season: 'season',
    purchaseDate: 'purchaseDate',
    image: 'image',
    isDeleted: 'isDeleted'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    sido: 'sido',
    sigungu: 'sigungu',
    dong: 'dong',
    code: 'code'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const WeatherScalarFieldEnum: {
    date: 'date',
    locationId: 'locationId',
    tempMin: 'tempMin',
    tempMax: 'tempMax',
    tempAvg: 'tempAvg',
    feelsLike: 'feelsLike',
    precipitation: 'precipitation',
    weatherIcon: 'weatherIcon',
    status: 'status'
  };

  export type WeatherScalarFieldEnum = (typeof WeatherScalarFieldEnum)[keyof typeof WeatherScalarFieldEnum]


  export const OutfitScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    locationId: 'locationId',
    date: 'date',
    weatherTempAvg: 'weatherTempAvg',
    mainImage: 'mainImage',
    memo: 'memo'
  };

  export type OutfitScalarFieldEnum = (typeof OutfitScalarFieldEnum)[keyof typeof OutfitScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const ItemTagScalarFieldEnum: {
    id: 'id',
    itemId: 'itemId',
    tagId: 'tagId'
  };

  export type ItemTagScalarFieldEnum = (typeof ItemTagScalarFieldEnum)[keyof typeof ItemTagScalarFieldEnum]


  export const OutfitItemScalarFieldEnum: {
    id: 'id',
    outfitId: 'outfitId',
    itemId: 'itemId'
  };

  export type OutfitItemScalarFieldEnum = (typeof OutfitItemScalarFieldEnum)[keyof typeof OutfitItemScalarFieldEnum]


  export const OutfitTagScalarFieldEnum: {
    id: 'id',
    outfitId: 'outfitId',
    tagId: 'tagId'
  };

  export type OutfitTagScalarFieldEnum = (typeof OutfitTagScalarFieldEnum)[keyof typeof OutfitTagScalarFieldEnum]


  export const OutfitLikeScalarFieldEnum: {
    id: 'id',
    outfitId: 'outfitId',
    userId: 'userId'
  };

  export type OutfitLikeScalarFieldEnum = (typeof OutfitLikeScalarFieldEnum)[keyof typeof OutfitLikeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    email: 'email',
    password: 'password',
    nickname: 'nickname',
    profileImage: 'profileImage'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const ItemOrderByRelevanceFieldEnum: {
    brand: 'brand',
    size: 'size',
    image: 'image'
  };

  export type ItemOrderByRelevanceFieldEnum = (typeof ItemOrderByRelevanceFieldEnum)[keyof typeof ItemOrderByRelevanceFieldEnum]


  export const LocationOrderByRelevanceFieldEnum: {
    sido: 'sido',
    sigungu: 'sigungu',
    dong: 'dong',
    code: 'code'
  };

  export type LocationOrderByRelevanceFieldEnum = (typeof LocationOrderByRelevanceFieldEnum)[keyof typeof LocationOrderByRelevanceFieldEnum]


  export const WeatherOrderByRelevanceFieldEnum: {
    weatherIcon: 'weatherIcon',
    status: 'status'
  };

  export type WeatherOrderByRelevanceFieldEnum = (typeof WeatherOrderByRelevanceFieldEnum)[keyof typeof WeatherOrderByRelevanceFieldEnum]


  export const OutfitOrderByRelevanceFieldEnum: {
    mainImage: 'mainImage',
    memo: 'memo'
  };

  export type OutfitOrderByRelevanceFieldEnum = (typeof OutfitOrderByRelevanceFieldEnum)[keyof typeof OutfitOrderByRelevanceFieldEnum]


  export const TagOrderByRelevanceFieldEnum: {
    name: 'name',
    type: 'type'
  };

  export type TagOrderByRelevanceFieldEnum = (typeof TagOrderByRelevanceFieldEnum)[keyof typeof TagOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    nickname?: StringFilter<"User"> | string
    profileImage?: StringNullableFilter<"User"> | string | null
    items?: ItemListRelationFilter
    outfits?: OutfitListRelationFilter
    outfitLikes?: OutfitLikeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    items?: ItemOrderByRelationAggregateInput
    outfits?: OutfitOrderByRelationAggregateInput
    outfitLikes?: OutfitLikeOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    nickname?: StringFilter<"User"> | string
    profileImage?: StringNullableFilter<"User"> | string | null
    items?: ItemListRelationFilter
    outfits?: OutfitListRelationFilter
    outfitLikes?: OutfitLikeListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    nickname?: StringWithAggregatesFilter<"User"> | string
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    id?: IntFilter<"Item"> | number
    userId?: IntFilter<"Item"> | number
    category?: IntFilter<"Item"> | number
    subcategory?: IntFilter<"Item"> | number
    brand?: StringNullableFilter<"Item"> | string | null
    color?: IntFilter<"Item"> | number
    size?: StringNullableFilter<"Item"> | string | null
    season?: IntFilter<"Item"> | number
    purchaseDate?: DateTimeNullableFilter<"Item"> | Date | string | null
    image?: StringNullableFilter<"Item"> | string | null
    isDeleted?: BoolFilter<"Item"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    itemTags?: ItemTagListRelationFilter
    outfitItems?: OutfitItemListRelationFilter
  }

  export type ItemOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    brand?: SortOrderInput | SortOrder
    color?: SortOrder
    size?: SortOrderInput | SortOrder
    season?: SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    user?: UserOrderByWithRelationInput
    itemTags?: ItemTagOrderByRelationAggregateInput
    outfitItems?: OutfitItemOrderByRelationAggregateInput
    _relevance?: ItemOrderByRelevanceInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    userId?: IntFilter<"Item"> | number
    category?: IntFilter<"Item"> | number
    subcategory?: IntFilter<"Item"> | number
    brand?: StringNullableFilter<"Item"> | string | null
    color?: IntFilter<"Item"> | number
    size?: StringNullableFilter<"Item"> | string | null
    season?: IntFilter<"Item"> | number
    purchaseDate?: DateTimeNullableFilter<"Item"> | Date | string | null
    image?: StringNullableFilter<"Item"> | string | null
    isDeleted?: BoolFilter<"Item"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    itemTags?: ItemTagListRelationFilter
    outfitItems?: OutfitItemListRelationFilter
  }, "id">

  export type ItemOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    brand?: SortOrderInput | SortOrder
    color?: SortOrder
    size?: SortOrderInput | SortOrder
    season?: SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    _count?: ItemCountOrderByAggregateInput
    _avg?: ItemAvgOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
    _sum?: ItemSumOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Item"> | number
    userId?: IntWithAggregatesFilter<"Item"> | number
    category?: IntWithAggregatesFilter<"Item"> | number
    subcategory?: IntWithAggregatesFilter<"Item"> | number
    brand?: StringNullableWithAggregatesFilter<"Item"> | string | null
    color?: IntWithAggregatesFilter<"Item"> | number
    size?: StringNullableWithAggregatesFilter<"Item"> | string | null
    season?: IntWithAggregatesFilter<"Item"> | number
    purchaseDate?: DateTimeNullableWithAggregatesFilter<"Item"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"Item"> | string | null
    isDeleted?: BoolWithAggregatesFilter<"Item"> | boolean
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: IntFilter<"Location"> | number
    sido?: StringFilter<"Location"> | string
    sigungu?: StringFilter<"Location"> | string
    dong?: StringFilter<"Location"> | string
    code?: StringFilter<"Location"> | string
    weather?: WeatherListRelationFilter
    outfits?: OutfitListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    sido?: SortOrder
    sigungu?: SortOrder
    dong?: SortOrder
    code?: SortOrder
    weather?: WeatherOrderByRelationAggregateInput
    outfits?: OutfitOrderByRelationAggregateInput
    _relevance?: LocationOrderByRelevanceInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    sido?: StringFilter<"Location"> | string
    sigungu?: StringFilter<"Location"> | string
    dong?: StringFilter<"Location"> | string
    weather?: WeatherListRelationFilter
    outfits?: OutfitListRelationFilter
  }, "id" | "code">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    sido?: SortOrder
    sigungu?: SortOrder
    dong?: SortOrder
    code?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _avg?: LocationAvgOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
    _sum?: LocationSumOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Location"> | number
    sido?: StringWithAggregatesFilter<"Location"> | string
    sigungu?: StringWithAggregatesFilter<"Location"> | string
    dong?: StringWithAggregatesFilter<"Location"> | string
    code?: StringWithAggregatesFilter<"Location"> | string
  }

  export type WeatherWhereInput = {
    AND?: WeatherWhereInput | WeatherWhereInput[]
    OR?: WeatherWhereInput[]
    NOT?: WeatherWhereInput | WeatherWhereInput[]
    date?: DateTimeFilter<"Weather"> | Date | string
    locationId?: IntFilter<"Weather"> | number
    tempMin?: FloatNullableFilter<"Weather"> | number | null
    tempMax?: FloatNullableFilter<"Weather"> | number | null
    tempAvg?: FloatNullableFilter<"Weather"> | number | null
    feelsLike?: FloatNullableFilter<"Weather"> | number | null
    precipitation?: FloatNullableFilter<"Weather"> | number | null
    weatherIcon?: StringNullableFilter<"Weather"> | string | null
    status?: StringNullableFilter<"Weather"> | string | null
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }

  export type WeatherOrderByWithRelationInput = {
    date?: SortOrder
    locationId?: SortOrder
    tempMin?: SortOrderInput | SortOrder
    tempMax?: SortOrderInput | SortOrder
    tempAvg?: SortOrderInput | SortOrder
    feelsLike?: SortOrderInput | SortOrder
    precipitation?: SortOrderInput | SortOrder
    weatherIcon?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    location?: LocationOrderByWithRelationInput
    _relevance?: WeatherOrderByRelevanceInput
  }

  export type WeatherWhereUniqueInput = Prisma.AtLeast<{
    date_locationId?: WeatherDateLocationIdCompoundUniqueInput
    AND?: WeatherWhereInput | WeatherWhereInput[]
    OR?: WeatherWhereInput[]
    NOT?: WeatherWhereInput | WeatherWhereInput[]
    date?: DateTimeFilter<"Weather"> | Date | string
    locationId?: IntFilter<"Weather"> | number
    tempMin?: FloatNullableFilter<"Weather"> | number | null
    tempMax?: FloatNullableFilter<"Weather"> | number | null
    tempAvg?: FloatNullableFilter<"Weather"> | number | null
    feelsLike?: FloatNullableFilter<"Weather"> | number | null
    precipitation?: FloatNullableFilter<"Weather"> | number | null
    weatherIcon?: StringNullableFilter<"Weather"> | string | null
    status?: StringNullableFilter<"Weather"> | string | null
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }, "date_locationId">

  export type WeatherOrderByWithAggregationInput = {
    date?: SortOrder
    locationId?: SortOrder
    tempMin?: SortOrderInput | SortOrder
    tempMax?: SortOrderInput | SortOrder
    tempAvg?: SortOrderInput | SortOrder
    feelsLike?: SortOrderInput | SortOrder
    precipitation?: SortOrderInput | SortOrder
    weatherIcon?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: WeatherCountOrderByAggregateInput
    _avg?: WeatherAvgOrderByAggregateInput
    _max?: WeatherMaxOrderByAggregateInput
    _min?: WeatherMinOrderByAggregateInput
    _sum?: WeatherSumOrderByAggregateInput
  }

  export type WeatherScalarWhereWithAggregatesInput = {
    AND?: WeatherScalarWhereWithAggregatesInput | WeatherScalarWhereWithAggregatesInput[]
    OR?: WeatherScalarWhereWithAggregatesInput[]
    NOT?: WeatherScalarWhereWithAggregatesInput | WeatherScalarWhereWithAggregatesInput[]
    date?: DateTimeWithAggregatesFilter<"Weather"> | Date | string
    locationId?: IntWithAggregatesFilter<"Weather"> | number
    tempMin?: FloatNullableWithAggregatesFilter<"Weather"> | number | null
    tempMax?: FloatNullableWithAggregatesFilter<"Weather"> | number | null
    tempAvg?: FloatNullableWithAggregatesFilter<"Weather"> | number | null
    feelsLike?: FloatNullableWithAggregatesFilter<"Weather"> | number | null
    precipitation?: FloatNullableWithAggregatesFilter<"Weather"> | number | null
    weatherIcon?: StringNullableWithAggregatesFilter<"Weather"> | string | null
    status?: StringNullableWithAggregatesFilter<"Weather"> | string | null
  }

  export type OutfitWhereInput = {
    AND?: OutfitWhereInput | OutfitWhereInput[]
    OR?: OutfitWhereInput[]
    NOT?: OutfitWhereInput | OutfitWhereInput[]
    id?: IntFilter<"Outfit"> | number
    userId?: IntFilter<"Outfit"> | number
    locationId?: IntFilter<"Outfit"> | number
    date?: DateTimeFilter<"Outfit"> | Date | string
    weatherTempAvg?: FloatNullableFilter<"Outfit"> | number | null
    mainImage?: StringNullableFilter<"Outfit"> | string | null
    memo?: StringNullableFilter<"Outfit"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    outfitItems?: OutfitItemListRelationFilter
    outfitTags?: OutfitTagListRelationFilter
    outfitLikes?: OutfitLikeListRelationFilter
  }

  export type OutfitOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    weatherTempAvg?: SortOrderInput | SortOrder
    mainImage?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    location?: LocationOrderByWithRelationInput
    outfitItems?: OutfitItemOrderByRelationAggregateInput
    outfitTags?: OutfitTagOrderByRelationAggregateInput
    outfitLikes?: OutfitLikeOrderByRelationAggregateInput
    _relevance?: OutfitOrderByRelevanceInput
  }

  export type OutfitWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OutfitWhereInput | OutfitWhereInput[]
    OR?: OutfitWhereInput[]
    NOT?: OutfitWhereInput | OutfitWhereInput[]
    userId?: IntFilter<"Outfit"> | number
    locationId?: IntFilter<"Outfit"> | number
    date?: DateTimeFilter<"Outfit"> | Date | string
    weatherTempAvg?: FloatNullableFilter<"Outfit"> | number | null
    mainImage?: StringNullableFilter<"Outfit"> | string | null
    memo?: StringNullableFilter<"Outfit"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    outfitItems?: OutfitItemListRelationFilter
    outfitTags?: OutfitTagListRelationFilter
    outfitLikes?: OutfitLikeListRelationFilter
  }, "id">

  export type OutfitOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    weatherTempAvg?: SortOrderInput | SortOrder
    mainImage?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    _count?: OutfitCountOrderByAggregateInput
    _avg?: OutfitAvgOrderByAggregateInput
    _max?: OutfitMaxOrderByAggregateInput
    _min?: OutfitMinOrderByAggregateInput
    _sum?: OutfitSumOrderByAggregateInput
  }

  export type OutfitScalarWhereWithAggregatesInput = {
    AND?: OutfitScalarWhereWithAggregatesInput | OutfitScalarWhereWithAggregatesInput[]
    OR?: OutfitScalarWhereWithAggregatesInput[]
    NOT?: OutfitScalarWhereWithAggregatesInput | OutfitScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Outfit"> | number
    userId?: IntWithAggregatesFilter<"Outfit"> | number
    locationId?: IntWithAggregatesFilter<"Outfit"> | number
    date?: DateTimeWithAggregatesFilter<"Outfit"> | Date | string
    weatherTempAvg?: FloatNullableWithAggregatesFilter<"Outfit"> | number | null
    mainImage?: StringNullableWithAggregatesFilter<"Outfit"> | string | null
    memo?: StringNullableWithAggregatesFilter<"Outfit"> | string | null
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
    type?: StringFilter<"Tag"> | string
    itemTags?: ItemTagListRelationFilter
    outfitTags?: OutfitTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    itemTags?: ItemTagOrderByRelationAggregateInput
    outfitTags?: OutfitTagOrderByRelationAggregateInput
    _relevance?: TagOrderByRelevanceInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    name?: StringFilter<"Tag"> | string
    type?: StringFilter<"Tag"> | string
    itemTags?: ItemTagListRelationFilter
    outfitTags?: OutfitTagListRelationFilter
  }, "id">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tag"> | number
    name?: StringWithAggregatesFilter<"Tag"> | string
    type?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type ItemTagWhereInput = {
    AND?: ItemTagWhereInput | ItemTagWhereInput[]
    OR?: ItemTagWhereInput[]
    NOT?: ItemTagWhereInput | ItemTagWhereInput[]
    id?: IntFilter<"ItemTag"> | number
    itemId?: IntFilter<"ItemTag"> | number
    tagId?: IntFilter<"ItemTag"> | number
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type ItemTagOrderByWithRelationInput = {
    id?: SortOrder
    itemId?: SortOrder
    tagId?: SortOrder
    item?: ItemOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type ItemTagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ItemTagWhereInput | ItemTagWhereInput[]
    OR?: ItemTagWhereInput[]
    NOT?: ItemTagWhereInput | ItemTagWhereInput[]
    itemId?: IntFilter<"ItemTag"> | number
    tagId?: IntFilter<"ItemTag"> | number
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "id">

  export type ItemTagOrderByWithAggregationInput = {
    id?: SortOrder
    itemId?: SortOrder
    tagId?: SortOrder
    _count?: ItemTagCountOrderByAggregateInput
    _avg?: ItemTagAvgOrderByAggregateInput
    _max?: ItemTagMaxOrderByAggregateInput
    _min?: ItemTagMinOrderByAggregateInput
    _sum?: ItemTagSumOrderByAggregateInput
  }

  export type ItemTagScalarWhereWithAggregatesInput = {
    AND?: ItemTagScalarWhereWithAggregatesInput | ItemTagScalarWhereWithAggregatesInput[]
    OR?: ItemTagScalarWhereWithAggregatesInput[]
    NOT?: ItemTagScalarWhereWithAggregatesInput | ItemTagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ItemTag"> | number
    itemId?: IntWithAggregatesFilter<"ItemTag"> | number
    tagId?: IntWithAggregatesFilter<"ItemTag"> | number
  }

  export type OutfitItemWhereInput = {
    AND?: OutfitItemWhereInput | OutfitItemWhereInput[]
    OR?: OutfitItemWhereInput[]
    NOT?: OutfitItemWhereInput | OutfitItemWhereInput[]
    id?: IntFilter<"OutfitItem"> | number
    outfitId?: IntFilter<"OutfitItem"> | number
    itemId?: IntFilter<"OutfitItem"> | number
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }

  export type OutfitItemOrderByWithRelationInput = {
    id?: SortOrder
    outfitId?: SortOrder
    itemId?: SortOrder
    outfit?: OutfitOrderByWithRelationInput
    item?: ItemOrderByWithRelationInput
  }

  export type OutfitItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OutfitItemWhereInput | OutfitItemWhereInput[]
    OR?: OutfitItemWhereInput[]
    NOT?: OutfitItemWhereInput | OutfitItemWhereInput[]
    outfitId?: IntFilter<"OutfitItem"> | number
    itemId?: IntFilter<"OutfitItem"> | number
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }, "id">

  export type OutfitItemOrderByWithAggregationInput = {
    id?: SortOrder
    outfitId?: SortOrder
    itemId?: SortOrder
    _count?: OutfitItemCountOrderByAggregateInput
    _avg?: OutfitItemAvgOrderByAggregateInput
    _max?: OutfitItemMaxOrderByAggregateInput
    _min?: OutfitItemMinOrderByAggregateInput
    _sum?: OutfitItemSumOrderByAggregateInput
  }

  export type OutfitItemScalarWhereWithAggregatesInput = {
    AND?: OutfitItemScalarWhereWithAggregatesInput | OutfitItemScalarWhereWithAggregatesInput[]
    OR?: OutfitItemScalarWhereWithAggregatesInput[]
    NOT?: OutfitItemScalarWhereWithAggregatesInput | OutfitItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OutfitItem"> | number
    outfitId?: IntWithAggregatesFilter<"OutfitItem"> | number
    itemId?: IntWithAggregatesFilter<"OutfitItem"> | number
  }

  export type OutfitTagWhereInput = {
    AND?: OutfitTagWhereInput | OutfitTagWhereInput[]
    OR?: OutfitTagWhereInput[]
    NOT?: OutfitTagWhereInput | OutfitTagWhereInput[]
    id?: IntFilter<"OutfitTag"> | number
    outfitId?: IntFilter<"OutfitTag"> | number
    tagId?: IntFilter<"OutfitTag"> | number
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type OutfitTagOrderByWithRelationInput = {
    id?: SortOrder
    outfitId?: SortOrder
    tagId?: SortOrder
    outfit?: OutfitOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type OutfitTagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OutfitTagWhereInput | OutfitTagWhereInput[]
    OR?: OutfitTagWhereInput[]
    NOT?: OutfitTagWhereInput | OutfitTagWhereInput[]
    outfitId?: IntFilter<"OutfitTag"> | number
    tagId?: IntFilter<"OutfitTag"> | number
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "id">

  export type OutfitTagOrderByWithAggregationInput = {
    id?: SortOrder
    outfitId?: SortOrder
    tagId?: SortOrder
    _count?: OutfitTagCountOrderByAggregateInput
    _avg?: OutfitTagAvgOrderByAggregateInput
    _max?: OutfitTagMaxOrderByAggregateInput
    _min?: OutfitTagMinOrderByAggregateInput
    _sum?: OutfitTagSumOrderByAggregateInput
  }

  export type OutfitTagScalarWhereWithAggregatesInput = {
    AND?: OutfitTagScalarWhereWithAggregatesInput | OutfitTagScalarWhereWithAggregatesInput[]
    OR?: OutfitTagScalarWhereWithAggregatesInput[]
    NOT?: OutfitTagScalarWhereWithAggregatesInput | OutfitTagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OutfitTag"> | number
    outfitId?: IntWithAggregatesFilter<"OutfitTag"> | number
    tagId?: IntWithAggregatesFilter<"OutfitTag"> | number
  }

  export type OutfitLikeWhereInput = {
    AND?: OutfitLikeWhereInput | OutfitLikeWhereInput[]
    OR?: OutfitLikeWhereInput[]
    NOT?: OutfitLikeWhereInput | OutfitLikeWhereInput[]
    id?: IntFilter<"OutfitLike"> | number
    outfitId?: IntFilter<"OutfitLike"> | number
    userId?: IntFilter<"OutfitLike"> | number
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OutfitLikeOrderByWithRelationInput = {
    id?: SortOrder
    outfitId?: SortOrder
    userId?: SortOrder
    outfit?: OutfitOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OutfitLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OutfitLikeWhereInput | OutfitLikeWhereInput[]
    OR?: OutfitLikeWhereInput[]
    NOT?: OutfitLikeWhereInput | OutfitLikeWhereInput[]
    outfitId?: IntFilter<"OutfitLike"> | number
    userId?: IntFilter<"OutfitLike"> | number
    outfit?: XOR<OutfitScalarRelationFilter, OutfitWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OutfitLikeOrderByWithAggregationInput = {
    id?: SortOrder
    outfitId?: SortOrder
    userId?: SortOrder
    _count?: OutfitLikeCountOrderByAggregateInput
    _avg?: OutfitLikeAvgOrderByAggregateInput
    _max?: OutfitLikeMaxOrderByAggregateInput
    _min?: OutfitLikeMinOrderByAggregateInput
    _sum?: OutfitLikeSumOrderByAggregateInput
  }

  export type OutfitLikeScalarWhereWithAggregatesInput = {
    AND?: OutfitLikeScalarWhereWithAggregatesInput | OutfitLikeScalarWhereWithAggregatesInput[]
    OR?: OutfitLikeScalarWhereWithAggregatesInput[]
    NOT?: OutfitLikeScalarWhereWithAggregatesInput | OutfitLikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OutfitLike"> | number
    outfitId?: IntWithAggregatesFilter<"OutfitLike"> | number
    userId?: IntWithAggregatesFilter<"OutfitLike"> | number
  }

  export type UserCreateInput = {
    email: string
    password: string
    nickname: string
    profileImage?: string | null
    items?: ItemCreateNestedManyWithoutUserInput
    outfits?: OutfitCreateNestedManyWithoutUserInput
    outfitLikes?: OutfitLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    nickname: string
    profileImage?: string | null
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    outfits?: OutfitUncheckedCreateNestedManyWithoutUserInput
    outfitLikes?: OutfitLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    items?: ItemUpdateManyWithoutUserNestedInput
    outfits?: OutfitUpdateManyWithoutUserNestedInput
    outfitLikes?: OutfitLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    outfits?: OutfitUncheckedUpdateManyWithoutUserNestedInput
    outfitLikes?: OutfitLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    nickname: string
    profileImage?: string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemCreateInput = {
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutItemsInput
    itemTags?: ItemTagCreateNestedManyWithoutItemInput
    outfitItems?: OutfitItemCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateInput = {
    id?: number
    userId: number
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
    itemTags?: ItemTagUncheckedCreateNestedManyWithoutItemInput
    outfitItems?: OutfitItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemUpdateInput = {
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutItemsNestedInput
    itemTags?: ItemTagUpdateManyWithoutItemNestedInput
    outfitItems?: OutfitItemUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    itemTags?: ItemTagUncheckedUpdateManyWithoutItemNestedInput
    outfitItems?: OutfitItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemCreateManyInput = {
    id?: number
    userId: number
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
  }

  export type ItemUpdateManyMutationInput = {
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LocationCreateInput = {
    sido: string
    sigungu: string
    dong: string
    code: string
    weather?: WeatherCreateNestedManyWithoutLocationInput
    outfits?: OutfitCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: number
    sido: string
    sigungu: string
    dong: string
    code: string
    weather?: WeatherUncheckedCreateNestedManyWithoutLocationInput
    outfits?: OutfitUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationUpdateInput = {
    sido?: StringFieldUpdateOperationsInput | string
    sigungu?: StringFieldUpdateOperationsInput | string
    dong?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    weather?: WeatherUpdateManyWithoutLocationNestedInput
    outfits?: OutfitUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sido?: StringFieldUpdateOperationsInput | string
    sigungu?: StringFieldUpdateOperationsInput | string
    dong?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    weather?: WeatherUncheckedUpdateManyWithoutLocationNestedInput
    outfits?: OutfitUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationCreateManyInput = {
    id?: number
    sido: string
    sigungu: string
    dong: string
    code: string
  }

  export type LocationUpdateManyMutationInput = {
    sido?: StringFieldUpdateOperationsInput | string
    sigungu?: StringFieldUpdateOperationsInput | string
    dong?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sido?: StringFieldUpdateOperationsInput | string
    sigungu?: StringFieldUpdateOperationsInput | string
    dong?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
  }

  export type WeatherCreateInput = {
    date: Date | string
    tempMin?: number | null
    tempMax?: number | null
    tempAvg?: number | null
    feelsLike?: number | null
    precipitation?: number | null
    weatherIcon?: string | null
    status?: string | null
    location: LocationCreateNestedOneWithoutWeatherInput
  }

  export type WeatherUncheckedCreateInput = {
    date: Date | string
    locationId: number
    tempMin?: number | null
    tempMax?: number | null
    tempAvg?: number | null
    feelsLike?: number | null
    precipitation?: number | null
    weatherIcon?: string | null
    status?: string | null
  }

  export type WeatherUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    tempMin?: NullableFloatFieldUpdateOperationsInput | number | null
    tempMax?: NullableFloatFieldUpdateOperationsInput | number | null
    tempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    feelsLike?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherIcon?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    location?: LocationUpdateOneRequiredWithoutWeatherNestedInput
  }

  export type WeatherUncheckedUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: IntFieldUpdateOperationsInput | number
    tempMin?: NullableFloatFieldUpdateOperationsInput | number | null
    tempMax?: NullableFloatFieldUpdateOperationsInput | number | null
    tempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    feelsLike?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherIcon?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WeatherCreateManyInput = {
    date: Date | string
    locationId: number
    tempMin?: number | null
    tempMax?: number | null
    tempAvg?: number | null
    feelsLike?: number | null
    precipitation?: number | null
    weatherIcon?: string | null
    status?: string | null
  }

  export type WeatherUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    tempMin?: NullableFloatFieldUpdateOperationsInput | number | null
    tempMax?: NullableFloatFieldUpdateOperationsInput | number | null
    tempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    feelsLike?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherIcon?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WeatherUncheckedUpdateManyInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: IntFieldUpdateOperationsInput | number
    tempMin?: NullableFloatFieldUpdateOperationsInput | number | null
    tempMax?: NullableFloatFieldUpdateOperationsInput | number | null
    tempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    feelsLike?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherIcon?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutfitCreateInput = {
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    user: UserCreateNestedOneWithoutOutfitsInput
    location: LocationCreateNestedOneWithoutOutfitsInput
    outfitItems?: OutfitItemCreateNestedManyWithoutOutfitInput
    outfitTags?: OutfitTagCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateInput = {
    id?: number
    userId: number
    locationId: number
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    outfitItems?: OutfitItemUncheckedCreateNestedManyWithoutOutfitInput
    outfitTags?: OutfitTagUncheckedCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOutfitsNestedInput
    location?: LocationUpdateOneRequiredWithoutOutfitsNestedInput
    outfitItems?: OutfitItemUpdateManyWithoutOutfitNestedInput
    outfitTags?: OutfitTagUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    outfitItems?: OutfitItemUncheckedUpdateManyWithoutOutfitNestedInput
    outfitTags?: OutfitTagUncheckedUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitCreateManyInput = {
    id?: number
    userId: number
    locationId: number
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
  }

  export type OutfitUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutfitUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagCreateInput = {
    name: string
    type: string
    itemTags?: ItemTagCreateNestedManyWithoutTagInput
    outfitTags?: OutfitTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    type: string
    itemTags?: ItemTagUncheckedCreateNestedManyWithoutTagInput
    outfitTags?: OutfitTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    itemTags?: ItemTagUpdateManyWithoutTagNestedInput
    outfitTags?: OutfitTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    itemTags?: ItemTagUncheckedUpdateManyWithoutTagNestedInput
    outfitTags?: OutfitTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
    type: string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type ItemTagCreateInput = {
    item: ItemCreateNestedOneWithoutItemTagsInput
    tag: TagCreateNestedOneWithoutItemTagsInput
  }

  export type ItemTagUncheckedCreateInput = {
    id?: number
    itemId: number
    tagId: number
  }

  export type ItemTagUpdateInput = {
    item?: ItemUpdateOneRequiredWithoutItemTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutItemTagsNestedInput
  }

  export type ItemTagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type ItemTagCreateManyInput = {
    id?: number
    itemId: number
    tagId: number
  }

  export type ItemTagUpdateManyMutationInput = {

  }

  export type ItemTagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitItemCreateInput = {
    outfit: OutfitCreateNestedOneWithoutOutfitItemsInput
    item: ItemCreateNestedOneWithoutOutfitItemsInput
  }

  export type OutfitItemUncheckedCreateInput = {
    id?: number
    outfitId: number
    itemId: number
  }

  export type OutfitItemUpdateInput = {
    outfit?: OutfitUpdateOneRequiredWithoutOutfitItemsNestedInput
    item?: ItemUpdateOneRequiredWithoutOutfitItemsNestedInput
  }

  export type OutfitItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitItemCreateManyInput = {
    id?: number
    outfitId: number
    itemId: number
  }

  export type OutfitItemUpdateManyMutationInput = {

  }

  export type OutfitItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitTagCreateInput = {
    outfit: OutfitCreateNestedOneWithoutOutfitTagsInput
    tag: TagCreateNestedOneWithoutOutfitTagsInput
  }

  export type OutfitTagUncheckedCreateInput = {
    id?: number
    outfitId: number
    tagId: number
  }

  export type OutfitTagUpdateInput = {
    outfit?: OutfitUpdateOneRequiredWithoutOutfitTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutOutfitTagsNestedInput
  }

  export type OutfitTagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitTagCreateManyInput = {
    id?: number
    outfitId: number
    tagId: number
  }

  export type OutfitTagUpdateManyMutationInput = {

  }

  export type OutfitTagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitLikeCreateInput = {
    outfit: OutfitCreateNestedOneWithoutOutfitLikesInput
    user: UserCreateNestedOneWithoutOutfitLikesInput
  }

  export type OutfitLikeUncheckedCreateInput = {
    id?: number
    outfitId: number
    userId: number
  }

  export type OutfitLikeUpdateInput = {
    outfit?: OutfitUpdateOneRequiredWithoutOutfitLikesNestedInput
    user?: UserUpdateOneRequiredWithoutOutfitLikesNestedInput
  }

  export type OutfitLikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitLikeCreateManyInput = {
    id?: number
    outfitId: number
    userId: number
  }

  export type OutfitLikeUpdateManyMutationInput = {

  }

  export type OutfitLikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ItemListRelationFilter = {
    every?: ItemWhereInput
    some?: ItemWhereInput
    none?: ItemWhereInput
  }

  export type OutfitListRelationFilter = {
    every?: OutfitWhereInput
    some?: OutfitWhereInput
    none?: OutfitWhereInput
  }

  export type OutfitLikeListRelationFilter = {
    every?: OutfitLikeWhereInput
    some?: OutfitLikeWhereInput
    none?: OutfitLikeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OutfitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OutfitLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImage?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImage?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nickname?: SortOrder
    profileImage?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ItemTagListRelationFilter = {
    every?: ItemTagWhereInput
    some?: ItemTagWhereInput
    none?: ItemTagWhereInput
  }

  export type OutfitItemListRelationFilter = {
    every?: OutfitItemWhereInput
    some?: OutfitItemWhereInput
    none?: OutfitItemWhereInput
  }

  export type ItemTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OutfitItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemOrderByRelevanceInput = {
    fields: ItemOrderByRelevanceFieldEnum | ItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ItemCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    brand?: SortOrder
    color?: SortOrder
    size?: SortOrder
    season?: SortOrder
    purchaseDate?: SortOrder
    image?: SortOrder
    isDeleted?: SortOrder
  }

  export type ItemAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    color?: SortOrder
    season?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    brand?: SortOrder
    color?: SortOrder
    size?: SortOrder
    season?: SortOrder
    purchaseDate?: SortOrder
    image?: SortOrder
    isDeleted?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    brand?: SortOrder
    color?: SortOrder
    size?: SortOrder
    season?: SortOrder
    purchaseDate?: SortOrder
    image?: SortOrder
    isDeleted?: SortOrder
  }

  export type ItemSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    color?: SortOrder
    season?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type WeatherListRelationFilter = {
    every?: WeatherWhereInput
    some?: WeatherWhereInput
    none?: WeatherWhereInput
  }

  export type WeatherOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationOrderByRelevanceInput = {
    fields: LocationOrderByRelevanceFieldEnum | LocationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    sido?: SortOrder
    sigungu?: SortOrder
    dong?: SortOrder
    code?: SortOrder
  }

  export type LocationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    sido?: SortOrder
    sigungu?: SortOrder
    dong?: SortOrder
    code?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    sido?: SortOrder
    sigungu?: SortOrder
    dong?: SortOrder
    code?: SortOrder
  }

  export type LocationSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type LocationScalarRelationFilter = {
    is?: LocationWhereInput
    isNot?: LocationWhereInput
  }

  export type WeatherOrderByRelevanceInput = {
    fields: WeatherOrderByRelevanceFieldEnum | WeatherOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WeatherDateLocationIdCompoundUniqueInput = {
    date: Date | string
    locationId: number
  }

  export type WeatherCountOrderByAggregateInput = {
    date?: SortOrder
    locationId?: SortOrder
    tempMin?: SortOrder
    tempMax?: SortOrder
    tempAvg?: SortOrder
    feelsLike?: SortOrder
    precipitation?: SortOrder
    weatherIcon?: SortOrder
    status?: SortOrder
  }

  export type WeatherAvgOrderByAggregateInput = {
    locationId?: SortOrder
    tempMin?: SortOrder
    tempMax?: SortOrder
    tempAvg?: SortOrder
    feelsLike?: SortOrder
    precipitation?: SortOrder
  }

  export type WeatherMaxOrderByAggregateInput = {
    date?: SortOrder
    locationId?: SortOrder
    tempMin?: SortOrder
    tempMax?: SortOrder
    tempAvg?: SortOrder
    feelsLike?: SortOrder
    precipitation?: SortOrder
    weatherIcon?: SortOrder
    status?: SortOrder
  }

  export type WeatherMinOrderByAggregateInput = {
    date?: SortOrder
    locationId?: SortOrder
    tempMin?: SortOrder
    tempMax?: SortOrder
    tempAvg?: SortOrder
    feelsLike?: SortOrder
    precipitation?: SortOrder
    weatherIcon?: SortOrder
    status?: SortOrder
  }

  export type WeatherSumOrderByAggregateInput = {
    locationId?: SortOrder
    tempMin?: SortOrder
    tempMax?: SortOrder
    tempAvg?: SortOrder
    feelsLike?: SortOrder
    precipitation?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type OutfitTagListRelationFilter = {
    every?: OutfitTagWhereInput
    some?: OutfitTagWhereInput
    none?: OutfitTagWhereInput
  }

  export type OutfitTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OutfitOrderByRelevanceInput = {
    fields: OutfitOrderByRelevanceFieldEnum | OutfitOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OutfitCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    weatherTempAvg?: SortOrder
    mainImage?: SortOrder
    memo?: SortOrder
  }

  export type OutfitAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
    weatherTempAvg?: SortOrder
  }

  export type OutfitMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    weatherTempAvg?: SortOrder
    mainImage?: SortOrder
    memo?: SortOrder
  }

  export type OutfitMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    weatherTempAvg?: SortOrder
    mainImage?: SortOrder
    memo?: SortOrder
  }

  export type OutfitSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
    weatherTempAvg?: SortOrder
  }

  export type TagOrderByRelevanceInput = {
    fields: TagOrderByRelevanceFieldEnum | TagOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ItemScalarRelationFilter = {
    is?: ItemWhereInput
    isNot?: ItemWhereInput
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type ItemTagCountOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    tagId?: SortOrder
  }

  export type ItemTagAvgOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    tagId?: SortOrder
  }

  export type ItemTagMaxOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    tagId?: SortOrder
  }

  export type ItemTagMinOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    tagId?: SortOrder
  }

  export type ItemTagSumOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    tagId?: SortOrder
  }

  export type OutfitScalarRelationFilter = {
    is?: OutfitWhereInput
    isNot?: OutfitWhereInput
  }

  export type OutfitItemCountOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    itemId?: SortOrder
  }

  export type OutfitItemAvgOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    itemId?: SortOrder
  }

  export type OutfitItemMaxOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    itemId?: SortOrder
  }

  export type OutfitItemMinOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    itemId?: SortOrder
  }

  export type OutfitItemSumOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    itemId?: SortOrder
  }

  export type OutfitTagCountOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    tagId?: SortOrder
  }

  export type OutfitTagAvgOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    tagId?: SortOrder
  }

  export type OutfitTagMaxOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    tagId?: SortOrder
  }

  export type OutfitTagMinOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    tagId?: SortOrder
  }

  export type OutfitTagSumOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    tagId?: SortOrder
  }

  export type OutfitLikeCountOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    userId?: SortOrder
  }

  export type OutfitLikeAvgOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    userId?: SortOrder
  }

  export type OutfitLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    userId?: SortOrder
  }

  export type OutfitLikeMinOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    userId?: SortOrder
  }

  export type OutfitLikeSumOrderByAggregateInput = {
    id?: SortOrder
    outfitId?: SortOrder
    userId?: SortOrder
  }

  export type ItemCreateNestedManyWithoutUserInput = {
    create?: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput> | ItemCreateWithoutUserInput[] | ItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutUserInput | ItemCreateOrConnectWithoutUserInput[]
    createMany?: ItemCreateManyUserInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type OutfitCreateNestedManyWithoutUserInput = {
    create?: XOR<OutfitCreateWithoutUserInput, OutfitUncheckedCreateWithoutUserInput> | OutfitCreateWithoutUserInput[] | OutfitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutUserInput | OutfitCreateOrConnectWithoutUserInput[]
    createMany?: OutfitCreateManyUserInputEnvelope
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
  }

  export type OutfitLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<OutfitLikeCreateWithoutUserInput, OutfitLikeUncheckedCreateWithoutUserInput> | OutfitLikeCreateWithoutUserInput[] | OutfitLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutfitLikeCreateOrConnectWithoutUserInput | OutfitLikeCreateOrConnectWithoutUserInput[]
    createMany?: OutfitLikeCreateManyUserInputEnvelope
    connect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput> | ItemCreateWithoutUserInput[] | ItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutUserInput | ItemCreateOrConnectWithoutUserInput[]
    createMany?: ItemCreateManyUserInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type OutfitUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OutfitCreateWithoutUserInput, OutfitUncheckedCreateWithoutUserInput> | OutfitCreateWithoutUserInput[] | OutfitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutUserInput | OutfitCreateOrConnectWithoutUserInput[]
    createMany?: OutfitCreateManyUserInputEnvelope
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
  }

  export type OutfitLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OutfitLikeCreateWithoutUserInput, OutfitLikeUncheckedCreateWithoutUserInput> | OutfitLikeCreateWithoutUserInput[] | OutfitLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutfitLikeCreateOrConnectWithoutUserInput | OutfitLikeCreateOrConnectWithoutUserInput[]
    createMany?: OutfitLikeCreateManyUserInputEnvelope
    connect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput> | ItemCreateWithoutUserInput[] | ItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutUserInput | ItemCreateOrConnectWithoutUserInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutUserInput | ItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ItemCreateManyUserInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutUserInput | ItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutUserInput | ItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type OutfitUpdateManyWithoutUserNestedInput = {
    create?: XOR<OutfitCreateWithoutUserInput, OutfitUncheckedCreateWithoutUserInput> | OutfitCreateWithoutUserInput[] | OutfitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutUserInput | OutfitCreateOrConnectWithoutUserInput[]
    upsert?: OutfitUpsertWithWhereUniqueWithoutUserInput | OutfitUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OutfitCreateManyUserInputEnvelope
    set?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    disconnect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    delete?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    update?: OutfitUpdateWithWhereUniqueWithoutUserInput | OutfitUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OutfitUpdateManyWithWhereWithoutUserInput | OutfitUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
  }

  export type OutfitLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<OutfitLikeCreateWithoutUserInput, OutfitLikeUncheckedCreateWithoutUserInput> | OutfitLikeCreateWithoutUserInput[] | OutfitLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutfitLikeCreateOrConnectWithoutUserInput | OutfitLikeCreateOrConnectWithoutUserInput[]
    upsert?: OutfitLikeUpsertWithWhereUniqueWithoutUserInput | OutfitLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OutfitLikeCreateManyUserInputEnvelope
    set?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    disconnect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    delete?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    connect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    update?: OutfitLikeUpdateWithWhereUniqueWithoutUserInput | OutfitLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OutfitLikeUpdateManyWithWhereWithoutUserInput | OutfitLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OutfitLikeScalarWhereInput | OutfitLikeScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput> | ItemCreateWithoutUserInput[] | ItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutUserInput | ItemCreateOrConnectWithoutUserInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutUserInput | ItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ItemCreateManyUserInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutUserInput | ItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutUserInput | ItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type OutfitUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OutfitCreateWithoutUserInput, OutfitUncheckedCreateWithoutUserInput> | OutfitCreateWithoutUserInput[] | OutfitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutUserInput | OutfitCreateOrConnectWithoutUserInput[]
    upsert?: OutfitUpsertWithWhereUniqueWithoutUserInput | OutfitUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OutfitCreateManyUserInputEnvelope
    set?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    disconnect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    delete?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    update?: OutfitUpdateWithWhereUniqueWithoutUserInput | OutfitUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OutfitUpdateManyWithWhereWithoutUserInput | OutfitUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
  }

  export type OutfitLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OutfitLikeCreateWithoutUserInput, OutfitLikeUncheckedCreateWithoutUserInput> | OutfitLikeCreateWithoutUserInput[] | OutfitLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutfitLikeCreateOrConnectWithoutUserInput | OutfitLikeCreateOrConnectWithoutUserInput[]
    upsert?: OutfitLikeUpsertWithWhereUniqueWithoutUserInput | OutfitLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OutfitLikeCreateManyUserInputEnvelope
    set?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    disconnect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    delete?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    connect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    update?: OutfitLikeUpdateWithWhereUniqueWithoutUserInput | OutfitLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OutfitLikeUpdateManyWithWhereWithoutUserInput | OutfitLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OutfitLikeScalarWhereInput | OutfitLikeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutItemsInput = {
    create?: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput
    connect?: UserWhereUniqueInput
  }

  export type ItemTagCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemTagCreateWithoutItemInput, ItemTagUncheckedCreateWithoutItemInput> | ItemTagCreateWithoutItemInput[] | ItemTagUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemTagCreateOrConnectWithoutItemInput | ItemTagCreateOrConnectWithoutItemInput[]
    createMany?: ItemTagCreateManyItemInputEnvelope
    connect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
  }

  export type OutfitItemCreateNestedManyWithoutItemInput = {
    create?: XOR<OutfitItemCreateWithoutItemInput, OutfitItemUncheckedCreateWithoutItemInput> | OutfitItemCreateWithoutItemInput[] | OutfitItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OutfitItemCreateOrConnectWithoutItemInput | OutfitItemCreateOrConnectWithoutItemInput[]
    createMany?: OutfitItemCreateManyItemInputEnvelope
    connect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
  }

  export type ItemTagUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemTagCreateWithoutItemInput, ItemTagUncheckedCreateWithoutItemInput> | ItemTagCreateWithoutItemInput[] | ItemTagUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemTagCreateOrConnectWithoutItemInput | ItemTagCreateOrConnectWithoutItemInput[]
    createMany?: ItemTagCreateManyItemInputEnvelope
    connect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
  }

  export type OutfitItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<OutfitItemCreateWithoutItemInput, OutfitItemUncheckedCreateWithoutItemInput> | OutfitItemCreateWithoutItemInput[] | OutfitItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OutfitItemCreateOrConnectWithoutItemInput | OutfitItemCreateOrConnectWithoutItemInput[]
    createMany?: OutfitItemCreateManyItemInputEnvelope
    connect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput
    upsert?: UserUpsertWithoutItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutItemsInput, UserUpdateWithoutItemsInput>, UserUncheckedUpdateWithoutItemsInput>
  }

  export type ItemTagUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemTagCreateWithoutItemInput, ItemTagUncheckedCreateWithoutItemInput> | ItemTagCreateWithoutItemInput[] | ItemTagUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemTagCreateOrConnectWithoutItemInput | ItemTagCreateOrConnectWithoutItemInput[]
    upsert?: ItemTagUpsertWithWhereUniqueWithoutItemInput | ItemTagUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemTagCreateManyItemInputEnvelope
    set?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    disconnect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    delete?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    connect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    update?: ItemTagUpdateWithWhereUniqueWithoutItemInput | ItemTagUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemTagUpdateManyWithWhereWithoutItemInput | ItemTagUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemTagScalarWhereInput | ItemTagScalarWhereInput[]
  }

  export type OutfitItemUpdateManyWithoutItemNestedInput = {
    create?: XOR<OutfitItemCreateWithoutItemInput, OutfitItemUncheckedCreateWithoutItemInput> | OutfitItemCreateWithoutItemInput[] | OutfitItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OutfitItemCreateOrConnectWithoutItemInput | OutfitItemCreateOrConnectWithoutItemInput[]
    upsert?: OutfitItemUpsertWithWhereUniqueWithoutItemInput | OutfitItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: OutfitItemCreateManyItemInputEnvelope
    set?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    disconnect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    delete?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    connect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    update?: OutfitItemUpdateWithWhereUniqueWithoutItemInput | OutfitItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: OutfitItemUpdateManyWithWhereWithoutItemInput | OutfitItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: OutfitItemScalarWhereInput | OutfitItemScalarWhereInput[]
  }

  export type ItemTagUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemTagCreateWithoutItemInput, ItemTagUncheckedCreateWithoutItemInput> | ItemTagCreateWithoutItemInput[] | ItemTagUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemTagCreateOrConnectWithoutItemInput | ItemTagCreateOrConnectWithoutItemInput[]
    upsert?: ItemTagUpsertWithWhereUniqueWithoutItemInput | ItemTagUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemTagCreateManyItemInputEnvelope
    set?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    disconnect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    delete?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    connect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    update?: ItemTagUpdateWithWhereUniqueWithoutItemInput | ItemTagUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemTagUpdateManyWithWhereWithoutItemInput | ItemTagUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemTagScalarWhereInput | ItemTagScalarWhereInput[]
  }

  export type OutfitItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<OutfitItemCreateWithoutItemInput, OutfitItemUncheckedCreateWithoutItemInput> | OutfitItemCreateWithoutItemInput[] | OutfitItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OutfitItemCreateOrConnectWithoutItemInput | OutfitItemCreateOrConnectWithoutItemInput[]
    upsert?: OutfitItemUpsertWithWhereUniqueWithoutItemInput | OutfitItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: OutfitItemCreateManyItemInputEnvelope
    set?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    disconnect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    delete?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    connect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    update?: OutfitItemUpdateWithWhereUniqueWithoutItemInput | OutfitItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: OutfitItemUpdateManyWithWhereWithoutItemInput | OutfitItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: OutfitItemScalarWhereInput | OutfitItemScalarWhereInput[]
  }

  export type WeatherCreateNestedManyWithoutLocationInput = {
    create?: XOR<WeatherCreateWithoutLocationInput, WeatherUncheckedCreateWithoutLocationInput> | WeatherCreateWithoutLocationInput[] | WeatherUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: WeatherCreateOrConnectWithoutLocationInput | WeatherCreateOrConnectWithoutLocationInput[]
    createMany?: WeatherCreateManyLocationInputEnvelope
    connect?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
  }

  export type OutfitCreateNestedManyWithoutLocationInput = {
    create?: XOR<OutfitCreateWithoutLocationInput, OutfitUncheckedCreateWithoutLocationInput> | OutfitCreateWithoutLocationInput[] | OutfitUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutLocationInput | OutfitCreateOrConnectWithoutLocationInput[]
    createMany?: OutfitCreateManyLocationInputEnvelope
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
  }

  export type WeatherUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<WeatherCreateWithoutLocationInput, WeatherUncheckedCreateWithoutLocationInput> | WeatherCreateWithoutLocationInput[] | WeatherUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: WeatherCreateOrConnectWithoutLocationInput | WeatherCreateOrConnectWithoutLocationInput[]
    createMany?: WeatherCreateManyLocationInputEnvelope
    connect?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
  }

  export type OutfitUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<OutfitCreateWithoutLocationInput, OutfitUncheckedCreateWithoutLocationInput> | OutfitCreateWithoutLocationInput[] | OutfitUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutLocationInput | OutfitCreateOrConnectWithoutLocationInput[]
    createMany?: OutfitCreateManyLocationInputEnvelope
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
  }

  export type WeatherUpdateManyWithoutLocationNestedInput = {
    create?: XOR<WeatherCreateWithoutLocationInput, WeatherUncheckedCreateWithoutLocationInput> | WeatherCreateWithoutLocationInput[] | WeatherUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: WeatherCreateOrConnectWithoutLocationInput | WeatherCreateOrConnectWithoutLocationInput[]
    upsert?: WeatherUpsertWithWhereUniqueWithoutLocationInput | WeatherUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: WeatherCreateManyLocationInputEnvelope
    set?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
    disconnect?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
    delete?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
    connect?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
    update?: WeatherUpdateWithWhereUniqueWithoutLocationInput | WeatherUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: WeatherUpdateManyWithWhereWithoutLocationInput | WeatherUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: WeatherScalarWhereInput | WeatherScalarWhereInput[]
  }

  export type OutfitUpdateManyWithoutLocationNestedInput = {
    create?: XOR<OutfitCreateWithoutLocationInput, OutfitUncheckedCreateWithoutLocationInput> | OutfitCreateWithoutLocationInput[] | OutfitUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutLocationInput | OutfitCreateOrConnectWithoutLocationInput[]
    upsert?: OutfitUpsertWithWhereUniqueWithoutLocationInput | OutfitUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: OutfitCreateManyLocationInputEnvelope
    set?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    disconnect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    delete?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    update?: OutfitUpdateWithWhereUniqueWithoutLocationInput | OutfitUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: OutfitUpdateManyWithWhereWithoutLocationInput | OutfitUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
  }

  export type WeatherUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<WeatherCreateWithoutLocationInput, WeatherUncheckedCreateWithoutLocationInput> | WeatherCreateWithoutLocationInput[] | WeatherUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: WeatherCreateOrConnectWithoutLocationInput | WeatherCreateOrConnectWithoutLocationInput[]
    upsert?: WeatherUpsertWithWhereUniqueWithoutLocationInput | WeatherUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: WeatherCreateManyLocationInputEnvelope
    set?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
    disconnect?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
    delete?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
    connect?: WeatherWhereUniqueInput | WeatherWhereUniqueInput[]
    update?: WeatherUpdateWithWhereUniqueWithoutLocationInput | WeatherUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: WeatherUpdateManyWithWhereWithoutLocationInput | WeatherUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: WeatherScalarWhereInput | WeatherScalarWhereInput[]
  }

  export type OutfitUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<OutfitCreateWithoutLocationInput, OutfitUncheckedCreateWithoutLocationInput> | OutfitCreateWithoutLocationInput[] | OutfitUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: OutfitCreateOrConnectWithoutLocationInput | OutfitCreateOrConnectWithoutLocationInput[]
    upsert?: OutfitUpsertWithWhereUniqueWithoutLocationInput | OutfitUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: OutfitCreateManyLocationInputEnvelope
    set?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    disconnect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    delete?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    connect?: OutfitWhereUniqueInput | OutfitWhereUniqueInput[]
    update?: OutfitUpdateWithWhereUniqueWithoutLocationInput | OutfitUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: OutfitUpdateManyWithWhereWithoutLocationInput | OutfitUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
  }

  export type LocationCreateNestedOneWithoutWeatherInput = {
    create?: XOR<LocationCreateWithoutWeatherInput, LocationUncheckedCreateWithoutWeatherInput>
    connectOrCreate?: LocationCreateOrConnectWithoutWeatherInput
    connect?: LocationWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LocationUpdateOneRequiredWithoutWeatherNestedInput = {
    create?: XOR<LocationCreateWithoutWeatherInput, LocationUncheckedCreateWithoutWeatherInput>
    connectOrCreate?: LocationCreateOrConnectWithoutWeatherInput
    upsert?: LocationUpsertWithoutWeatherInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutWeatherInput, LocationUpdateWithoutWeatherInput>, LocationUncheckedUpdateWithoutWeatherInput>
  }

  export type UserCreateNestedOneWithoutOutfitsInput = {
    create?: XOR<UserCreateWithoutOutfitsInput, UserUncheckedCreateWithoutOutfitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOutfitsInput
    connect?: UserWhereUniqueInput
  }

  export type LocationCreateNestedOneWithoutOutfitsInput = {
    create?: XOR<LocationCreateWithoutOutfitsInput, LocationUncheckedCreateWithoutOutfitsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutOutfitsInput
    connect?: LocationWhereUniqueInput
  }

  export type OutfitItemCreateNestedManyWithoutOutfitInput = {
    create?: XOR<OutfitItemCreateWithoutOutfitInput, OutfitItemUncheckedCreateWithoutOutfitInput> | OutfitItemCreateWithoutOutfitInput[] | OutfitItemUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitItemCreateOrConnectWithoutOutfitInput | OutfitItemCreateOrConnectWithoutOutfitInput[]
    createMany?: OutfitItemCreateManyOutfitInputEnvelope
    connect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
  }

  export type OutfitTagCreateNestedManyWithoutOutfitInput = {
    create?: XOR<OutfitTagCreateWithoutOutfitInput, OutfitTagUncheckedCreateWithoutOutfitInput> | OutfitTagCreateWithoutOutfitInput[] | OutfitTagUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitTagCreateOrConnectWithoutOutfitInput | OutfitTagCreateOrConnectWithoutOutfitInput[]
    createMany?: OutfitTagCreateManyOutfitInputEnvelope
    connect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
  }

  export type OutfitLikeCreateNestedManyWithoutOutfitInput = {
    create?: XOR<OutfitLikeCreateWithoutOutfitInput, OutfitLikeUncheckedCreateWithoutOutfitInput> | OutfitLikeCreateWithoutOutfitInput[] | OutfitLikeUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitLikeCreateOrConnectWithoutOutfitInput | OutfitLikeCreateOrConnectWithoutOutfitInput[]
    createMany?: OutfitLikeCreateManyOutfitInputEnvelope
    connect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
  }

  export type OutfitItemUncheckedCreateNestedManyWithoutOutfitInput = {
    create?: XOR<OutfitItemCreateWithoutOutfitInput, OutfitItemUncheckedCreateWithoutOutfitInput> | OutfitItemCreateWithoutOutfitInput[] | OutfitItemUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitItemCreateOrConnectWithoutOutfitInput | OutfitItemCreateOrConnectWithoutOutfitInput[]
    createMany?: OutfitItemCreateManyOutfitInputEnvelope
    connect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
  }

  export type OutfitTagUncheckedCreateNestedManyWithoutOutfitInput = {
    create?: XOR<OutfitTagCreateWithoutOutfitInput, OutfitTagUncheckedCreateWithoutOutfitInput> | OutfitTagCreateWithoutOutfitInput[] | OutfitTagUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitTagCreateOrConnectWithoutOutfitInput | OutfitTagCreateOrConnectWithoutOutfitInput[]
    createMany?: OutfitTagCreateManyOutfitInputEnvelope
    connect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
  }

  export type OutfitLikeUncheckedCreateNestedManyWithoutOutfitInput = {
    create?: XOR<OutfitLikeCreateWithoutOutfitInput, OutfitLikeUncheckedCreateWithoutOutfitInput> | OutfitLikeCreateWithoutOutfitInput[] | OutfitLikeUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitLikeCreateOrConnectWithoutOutfitInput | OutfitLikeCreateOrConnectWithoutOutfitInput[]
    createMany?: OutfitLikeCreateManyOutfitInputEnvelope
    connect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOutfitsNestedInput = {
    create?: XOR<UserCreateWithoutOutfitsInput, UserUncheckedCreateWithoutOutfitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOutfitsInput
    upsert?: UserUpsertWithoutOutfitsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOutfitsInput, UserUpdateWithoutOutfitsInput>, UserUncheckedUpdateWithoutOutfitsInput>
  }

  export type LocationUpdateOneRequiredWithoutOutfitsNestedInput = {
    create?: XOR<LocationCreateWithoutOutfitsInput, LocationUncheckedCreateWithoutOutfitsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutOutfitsInput
    upsert?: LocationUpsertWithoutOutfitsInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutOutfitsInput, LocationUpdateWithoutOutfitsInput>, LocationUncheckedUpdateWithoutOutfitsInput>
  }

  export type OutfitItemUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<OutfitItemCreateWithoutOutfitInput, OutfitItemUncheckedCreateWithoutOutfitInput> | OutfitItemCreateWithoutOutfitInput[] | OutfitItemUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitItemCreateOrConnectWithoutOutfitInput | OutfitItemCreateOrConnectWithoutOutfitInput[]
    upsert?: OutfitItemUpsertWithWhereUniqueWithoutOutfitInput | OutfitItemUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: OutfitItemCreateManyOutfitInputEnvelope
    set?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    disconnect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    delete?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    connect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    update?: OutfitItemUpdateWithWhereUniqueWithoutOutfitInput | OutfitItemUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: OutfitItemUpdateManyWithWhereWithoutOutfitInput | OutfitItemUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: OutfitItemScalarWhereInput | OutfitItemScalarWhereInput[]
  }

  export type OutfitTagUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<OutfitTagCreateWithoutOutfitInput, OutfitTagUncheckedCreateWithoutOutfitInput> | OutfitTagCreateWithoutOutfitInput[] | OutfitTagUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitTagCreateOrConnectWithoutOutfitInput | OutfitTagCreateOrConnectWithoutOutfitInput[]
    upsert?: OutfitTagUpsertWithWhereUniqueWithoutOutfitInput | OutfitTagUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: OutfitTagCreateManyOutfitInputEnvelope
    set?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    disconnect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    delete?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    connect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    update?: OutfitTagUpdateWithWhereUniqueWithoutOutfitInput | OutfitTagUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: OutfitTagUpdateManyWithWhereWithoutOutfitInput | OutfitTagUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: OutfitTagScalarWhereInput | OutfitTagScalarWhereInput[]
  }

  export type OutfitLikeUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<OutfitLikeCreateWithoutOutfitInput, OutfitLikeUncheckedCreateWithoutOutfitInput> | OutfitLikeCreateWithoutOutfitInput[] | OutfitLikeUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitLikeCreateOrConnectWithoutOutfitInput | OutfitLikeCreateOrConnectWithoutOutfitInput[]
    upsert?: OutfitLikeUpsertWithWhereUniqueWithoutOutfitInput | OutfitLikeUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: OutfitLikeCreateManyOutfitInputEnvelope
    set?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    disconnect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    delete?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    connect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    update?: OutfitLikeUpdateWithWhereUniqueWithoutOutfitInput | OutfitLikeUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: OutfitLikeUpdateManyWithWhereWithoutOutfitInput | OutfitLikeUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: OutfitLikeScalarWhereInput | OutfitLikeScalarWhereInput[]
  }

  export type OutfitItemUncheckedUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<OutfitItemCreateWithoutOutfitInput, OutfitItemUncheckedCreateWithoutOutfitInput> | OutfitItemCreateWithoutOutfitInput[] | OutfitItemUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitItemCreateOrConnectWithoutOutfitInput | OutfitItemCreateOrConnectWithoutOutfitInput[]
    upsert?: OutfitItemUpsertWithWhereUniqueWithoutOutfitInput | OutfitItemUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: OutfitItemCreateManyOutfitInputEnvelope
    set?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    disconnect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    delete?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    connect?: OutfitItemWhereUniqueInput | OutfitItemWhereUniqueInput[]
    update?: OutfitItemUpdateWithWhereUniqueWithoutOutfitInput | OutfitItemUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: OutfitItemUpdateManyWithWhereWithoutOutfitInput | OutfitItemUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: OutfitItemScalarWhereInput | OutfitItemScalarWhereInput[]
  }

  export type OutfitTagUncheckedUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<OutfitTagCreateWithoutOutfitInput, OutfitTagUncheckedCreateWithoutOutfitInput> | OutfitTagCreateWithoutOutfitInput[] | OutfitTagUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitTagCreateOrConnectWithoutOutfitInput | OutfitTagCreateOrConnectWithoutOutfitInput[]
    upsert?: OutfitTagUpsertWithWhereUniqueWithoutOutfitInput | OutfitTagUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: OutfitTagCreateManyOutfitInputEnvelope
    set?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    disconnect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    delete?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    connect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    update?: OutfitTagUpdateWithWhereUniqueWithoutOutfitInput | OutfitTagUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: OutfitTagUpdateManyWithWhereWithoutOutfitInput | OutfitTagUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: OutfitTagScalarWhereInput | OutfitTagScalarWhereInput[]
  }

  export type OutfitLikeUncheckedUpdateManyWithoutOutfitNestedInput = {
    create?: XOR<OutfitLikeCreateWithoutOutfitInput, OutfitLikeUncheckedCreateWithoutOutfitInput> | OutfitLikeCreateWithoutOutfitInput[] | OutfitLikeUncheckedCreateWithoutOutfitInput[]
    connectOrCreate?: OutfitLikeCreateOrConnectWithoutOutfitInput | OutfitLikeCreateOrConnectWithoutOutfitInput[]
    upsert?: OutfitLikeUpsertWithWhereUniqueWithoutOutfitInput | OutfitLikeUpsertWithWhereUniqueWithoutOutfitInput[]
    createMany?: OutfitLikeCreateManyOutfitInputEnvelope
    set?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    disconnect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    delete?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    connect?: OutfitLikeWhereUniqueInput | OutfitLikeWhereUniqueInput[]
    update?: OutfitLikeUpdateWithWhereUniqueWithoutOutfitInput | OutfitLikeUpdateWithWhereUniqueWithoutOutfitInput[]
    updateMany?: OutfitLikeUpdateManyWithWhereWithoutOutfitInput | OutfitLikeUpdateManyWithWhereWithoutOutfitInput[]
    deleteMany?: OutfitLikeScalarWhereInput | OutfitLikeScalarWhereInput[]
  }

  export type ItemTagCreateNestedManyWithoutTagInput = {
    create?: XOR<ItemTagCreateWithoutTagInput, ItemTagUncheckedCreateWithoutTagInput> | ItemTagCreateWithoutTagInput[] | ItemTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ItemTagCreateOrConnectWithoutTagInput | ItemTagCreateOrConnectWithoutTagInput[]
    createMany?: ItemTagCreateManyTagInputEnvelope
    connect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
  }

  export type OutfitTagCreateNestedManyWithoutTagInput = {
    create?: XOR<OutfitTagCreateWithoutTagInput, OutfitTagUncheckedCreateWithoutTagInput> | OutfitTagCreateWithoutTagInput[] | OutfitTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: OutfitTagCreateOrConnectWithoutTagInput | OutfitTagCreateOrConnectWithoutTagInput[]
    createMany?: OutfitTagCreateManyTagInputEnvelope
    connect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
  }

  export type ItemTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<ItemTagCreateWithoutTagInput, ItemTagUncheckedCreateWithoutTagInput> | ItemTagCreateWithoutTagInput[] | ItemTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ItemTagCreateOrConnectWithoutTagInput | ItemTagCreateOrConnectWithoutTagInput[]
    createMany?: ItemTagCreateManyTagInputEnvelope
    connect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
  }

  export type OutfitTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<OutfitTagCreateWithoutTagInput, OutfitTagUncheckedCreateWithoutTagInput> | OutfitTagCreateWithoutTagInput[] | OutfitTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: OutfitTagCreateOrConnectWithoutTagInput | OutfitTagCreateOrConnectWithoutTagInput[]
    createMany?: OutfitTagCreateManyTagInputEnvelope
    connect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
  }

  export type ItemTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<ItemTagCreateWithoutTagInput, ItemTagUncheckedCreateWithoutTagInput> | ItemTagCreateWithoutTagInput[] | ItemTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ItemTagCreateOrConnectWithoutTagInput | ItemTagCreateOrConnectWithoutTagInput[]
    upsert?: ItemTagUpsertWithWhereUniqueWithoutTagInput | ItemTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ItemTagCreateManyTagInputEnvelope
    set?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    disconnect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    delete?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    connect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    update?: ItemTagUpdateWithWhereUniqueWithoutTagInput | ItemTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ItemTagUpdateManyWithWhereWithoutTagInput | ItemTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ItemTagScalarWhereInput | ItemTagScalarWhereInput[]
  }

  export type OutfitTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<OutfitTagCreateWithoutTagInput, OutfitTagUncheckedCreateWithoutTagInput> | OutfitTagCreateWithoutTagInput[] | OutfitTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: OutfitTagCreateOrConnectWithoutTagInput | OutfitTagCreateOrConnectWithoutTagInput[]
    upsert?: OutfitTagUpsertWithWhereUniqueWithoutTagInput | OutfitTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: OutfitTagCreateManyTagInputEnvelope
    set?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    disconnect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    delete?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    connect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    update?: OutfitTagUpdateWithWhereUniqueWithoutTagInput | OutfitTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: OutfitTagUpdateManyWithWhereWithoutTagInput | OutfitTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: OutfitTagScalarWhereInput | OutfitTagScalarWhereInput[]
  }

  export type ItemTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<ItemTagCreateWithoutTagInput, ItemTagUncheckedCreateWithoutTagInput> | ItemTagCreateWithoutTagInput[] | ItemTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ItemTagCreateOrConnectWithoutTagInput | ItemTagCreateOrConnectWithoutTagInput[]
    upsert?: ItemTagUpsertWithWhereUniqueWithoutTagInput | ItemTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ItemTagCreateManyTagInputEnvelope
    set?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    disconnect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    delete?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    connect?: ItemTagWhereUniqueInput | ItemTagWhereUniqueInput[]
    update?: ItemTagUpdateWithWhereUniqueWithoutTagInput | ItemTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ItemTagUpdateManyWithWhereWithoutTagInput | ItemTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ItemTagScalarWhereInput | ItemTagScalarWhereInput[]
  }

  export type OutfitTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<OutfitTagCreateWithoutTagInput, OutfitTagUncheckedCreateWithoutTagInput> | OutfitTagCreateWithoutTagInput[] | OutfitTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: OutfitTagCreateOrConnectWithoutTagInput | OutfitTagCreateOrConnectWithoutTagInput[]
    upsert?: OutfitTagUpsertWithWhereUniqueWithoutTagInput | OutfitTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: OutfitTagCreateManyTagInputEnvelope
    set?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    disconnect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    delete?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    connect?: OutfitTagWhereUniqueInput | OutfitTagWhereUniqueInput[]
    update?: OutfitTagUpdateWithWhereUniqueWithoutTagInput | OutfitTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: OutfitTagUpdateManyWithWhereWithoutTagInput | OutfitTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: OutfitTagScalarWhereInput | OutfitTagScalarWhereInput[]
  }

  export type ItemCreateNestedOneWithoutItemTagsInput = {
    create?: XOR<ItemCreateWithoutItemTagsInput, ItemUncheckedCreateWithoutItemTagsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutItemTagsInput
    connect?: ItemWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutItemTagsInput = {
    create?: XOR<TagCreateWithoutItemTagsInput, TagUncheckedCreateWithoutItemTagsInput>
    connectOrCreate?: TagCreateOrConnectWithoutItemTagsInput
    connect?: TagWhereUniqueInput
  }

  export type ItemUpdateOneRequiredWithoutItemTagsNestedInput = {
    create?: XOR<ItemCreateWithoutItemTagsInput, ItemUncheckedCreateWithoutItemTagsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutItemTagsInput
    upsert?: ItemUpsertWithoutItemTagsInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutItemTagsInput, ItemUpdateWithoutItemTagsInput>, ItemUncheckedUpdateWithoutItemTagsInput>
  }

  export type TagUpdateOneRequiredWithoutItemTagsNestedInput = {
    create?: XOR<TagCreateWithoutItemTagsInput, TagUncheckedCreateWithoutItemTagsInput>
    connectOrCreate?: TagCreateOrConnectWithoutItemTagsInput
    upsert?: TagUpsertWithoutItemTagsInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutItemTagsInput, TagUpdateWithoutItemTagsInput>, TagUncheckedUpdateWithoutItemTagsInput>
  }

  export type OutfitCreateNestedOneWithoutOutfitItemsInput = {
    create?: XOR<OutfitCreateWithoutOutfitItemsInput, OutfitUncheckedCreateWithoutOutfitItemsInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutOutfitItemsInput
    connect?: OutfitWhereUniqueInput
  }

  export type ItemCreateNestedOneWithoutOutfitItemsInput = {
    create?: XOR<ItemCreateWithoutOutfitItemsInput, ItemUncheckedCreateWithoutOutfitItemsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutOutfitItemsInput
    connect?: ItemWhereUniqueInput
  }

  export type OutfitUpdateOneRequiredWithoutOutfitItemsNestedInput = {
    create?: XOR<OutfitCreateWithoutOutfitItemsInput, OutfitUncheckedCreateWithoutOutfitItemsInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutOutfitItemsInput
    upsert?: OutfitUpsertWithoutOutfitItemsInput
    connect?: OutfitWhereUniqueInput
    update?: XOR<XOR<OutfitUpdateToOneWithWhereWithoutOutfitItemsInput, OutfitUpdateWithoutOutfitItemsInput>, OutfitUncheckedUpdateWithoutOutfitItemsInput>
  }

  export type ItemUpdateOneRequiredWithoutOutfitItemsNestedInput = {
    create?: XOR<ItemCreateWithoutOutfitItemsInput, ItemUncheckedCreateWithoutOutfitItemsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutOutfitItemsInput
    upsert?: ItemUpsertWithoutOutfitItemsInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutOutfitItemsInput, ItemUpdateWithoutOutfitItemsInput>, ItemUncheckedUpdateWithoutOutfitItemsInput>
  }

  export type OutfitCreateNestedOneWithoutOutfitTagsInput = {
    create?: XOR<OutfitCreateWithoutOutfitTagsInput, OutfitUncheckedCreateWithoutOutfitTagsInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutOutfitTagsInput
    connect?: OutfitWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutOutfitTagsInput = {
    create?: XOR<TagCreateWithoutOutfitTagsInput, TagUncheckedCreateWithoutOutfitTagsInput>
    connectOrCreate?: TagCreateOrConnectWithoutOutfitTagsInput
    connect?: TagWhereUniqueInput
  }

  export type OutfitUpdateOneRequiredWithoutOutfitTagsNestedInput = {
    create?: XOR<OutfitCreateWithoutOutfitTagsInput, OutfitUncheckedCreateWithoutOutfitTagsInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutOutfitTagsInput
    upsert?: OutfitUpsertWithoutOutfitTagsInput
    connect?: OutfitWhereUniqueInput
    update?: XOR<XOR<OutfitUpdateToOneWithWhereWithoutOutfitTagsInput, OutfitUpdateWithoutOutfitTagsInput>, OutfitUncheckedUpdateWithoutOutfitTagsInput>
  }

  export type TagUpdateOneRequiredWithoutOutfitTagsNestedInput = {
    create?: XOR<TagCreateWithoutOutfitTagsInput, TagUncheckedCreateWithoutOutfitTagsInput>
    connectOrCreate?: TagCreateOrConnectWithoutOutfitTagsInput
    upsert?: TagUpsertWithoutOutfitTagsInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutOutfitTagsInput, TagUpdateWithoutOutfitTagsInput>, TagUncheckedUpdateWithoutOutfitTagsInput>
  }

  export type OutfitCreateNestedOneWithoutOutfitLikesInput = {
    create?: XOR<OutfitCreateWithoutOutfitLikesInput, OutfitUncheckedCreateWithoutOutfitLikesInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutOutfitLikesInput
    connect?: OutfitWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOutfitLikesInput = {
    create?: XOR<UserCreateWithoutOutfitLikesInput, UserUncheckedCreateWithoutOutfitLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOutfitLikesInput
    connect?: UserWhereUniqueInput
  }

  export type OutfitUpdateOneRequiredWithoutOutfitLikesNestedInput = {
    create?: XOR<OutfitCreateWithoutOutfitLikesInput, OutfitUncheckedCreateWithoutOutfitLikesInput>
    connectOrCreate?: OutfitCreateOrConnectWithoutOutfitLikesInput
    upsert?: OutfitUpsertWithoutOutfitLikesInput
    connect?: OutfitWhereUniqueInput
    update?: XOR<XOR<OutfitUpdateToOneWithWhereWithoutOutfitLikesInput, OutfitUpdateWithoutOutfitLikesInput>, OutfitUncheckedUpdateWithoutOutfitLikesInput>
  }

  export type UserUpdateOneRequiredWithoutOutfitLikesNestedInput = {
    create?: XOR<UserCreateWithoutOutfitLikesInput, UserUncheckedCreateWithoutOutfitLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOutfitLikesInput
    upsert?: UserUpsertWithoutOutfitLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOutfitLikesInput, UserUpdateWithoutOutfitLikesInput>, UserUncheckedUpdateWithoutOutfitLikesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ItemCreateWithoutUserInput = {
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
    itemTags?: ItemTagCreateNestedManyWithoutItemInput
    outfitItems?: OutfitItemCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutUserInput = {
    id?: number
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
    itemTags?: ItemTagUncheckedCreateNestedManyWithoutItemInput
    outfitItems?: OutfitItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutUserInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput>
  }

  export type ItemCreateManyUserInputEnvelope = {
    data: ItemCreateManyUserInput | ItemCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OutfitCreateWithoutUserInput = {
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    location: LocationCreateNestedOneWithoutOutfitsInput
    outfitItems?: OutfitItemCreateNestedManyWithoutOutfitInput
    outfitTags?: OutfitTagCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateWithoutUserInput = {
    id?: number
    locationId: number
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    outfitItems?: OutfitItemUncheckedCreateNestedManyWithoutOutfitInput
    outfitTags?: OutfitTagUncheckedCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitCreateOrConnectWithoutUserInput = {
    where: OutfitWhereUniqueInput
    create: XOR<OutfitCreateWithoutUserInput, OutfitUncheckedCreateWithoutUserInput>
  }

  export type OutfitCreateManyUserInputEnvelope = {
    data: OutfitCreateManyUserInput | OutfitCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OutfitLikeCreateWithoutUserInput = {
    outfit: OutfitCreateNestedOneWithoutOutfitLikesInput
  }

  export type OutfitLikeUncheckedCreateWithoutUserInput = {
    id?: number
    outfitId: number
  }

  export type OutfitLikeCreateOrConnectWithoutUserInput = {
    where: OutfitLikeWhereUniqueInput
    create: XOR<OutfitLikeCreateWithoutUserInput, OutfitLikeUncheckedCreateWithoutUserInput>
  }

  export type OutfitLikeCreateManyUserInputEnvelope = {
    data: OutfitLikeCreateManyUserInput | OutfitLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ItemUpsertWithWhereUniqueWithoutUserInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutUserInput, ItemUncheckedUpdateWithoutUserInput>
    create: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutUserInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutUserInput, ItemUncheckedUpdateWithoutUserInput>
  }

  export type ItemUpdateManyWithWhereWithoutUserInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutUserInput>
  }

  export type ItemScalarWhereInput = {
    AND?: ItemScalarWhereInput | ItemScalarWhereInput[]
    OR?: ItemScalarWhereInput[]
    NOT?: ItemScalarWhereInput | ItemScalarWhereInput[]
    id?: IntFilter<"Item"> | number
    userId?: IntFilter<"Item"> | number
    category?: IntFilter<"Item"> | number
    subcategory?: IntFilter<"Item"> | number
    brand?: StringNullableFilter<"Item"> | string | null
    color?: IntFilter<"Item"> | number
    size?: StringNullableFilter<"Item"> | string | null
    season?: IntFilter<"Item"> | number
    purchaseDate?: DateTimeNullableFilter<"Item"> | Date | string | null
    image?: StringNullableFilter<"Item"> | string | null
    isDeleted?: BoolFilter<"Item"> | boolean
  }

  export type OutfitUpsertWithWhereUniqueWithoutUserInput = {
    where: OutfitWhereUniqueInput
    update: XOR<OutfitUpdateWithoutUserInput, OutfitUncheckedUpdateWithoutUserInput>
    create: XOR<OutfitCreateWithoutUserInput, OutfitUncheckedCreateWithoutUserInput>
  }

  export type OutfitUpdateWithWhereUniqueWithoutUserInput = {
    where: OutfitWhereUniqueInput
    data: XOR<OutfitUpdateWithoutUserInput, OutfitUncheckedUpdateWithoutUserInput>
  }

  export type OutfitUpdateManyWithWhereWithoutUserInput = {
    where: OutfitScalarWhereInput
    data: XOR<OutfitUpdateManyMutationInput, OutfitUncheckedUpdateManyWithoutUserInput>
  }

  export type OutfitScalarWhereInput = {
    AND?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
    OR?: OutfitScalarWhereInput[]
    NOT?: OutfitScalarWhereInput | OutfitScalarWhereInput[]
    id?: IntFilter<"Outfit"> | number
    userId?: IntFilter<"Outfit"> | number
    locationId?: IntFilter<"Outfit"> | number
    date?: DateTimeFilter<"Outfit"> | Date | string
    weatherTempAvg?: FloatNullableFilter<"Outfit"> | number | null
    mainImage?: StringNullableFilter<"Outfit"> | string | null
    memo?: StringNullableFilter<"Outfit"> | string | null
  }

  export type OutfitLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: OutfitLikeWhereUniqueInput
    update: XOR<OutfitLikeUpdateWithoutUserInput, OutfitLikeUncheckedUpdateWithoutUserInput>
    create: XOR<OutfitLikeCreateWithoutUserInput, OutfitLikeUncheckedCreateWithoutUserInput>
  }

  export type OutfitLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: OutfitLikeWhereUniqueInput
    data: XOR<OutfitLikeUpdateWithoutUserInput, OutfitLikeUncheckedUpdateWithoutUserInput>
  }

  export type OutfitLikeUpdateManyWithWhereWithoutUserInput = {
    where: OutfitLikeScalarWhereInput
    data: XOR<OutfitLikeUpdateManyMutationInput, OutfitLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type OutfitLikeScalarWhereInput = {
    AND?: OutfitLikeScalarWhereInput | OutfitLikeScalarWhereInput[]
    OR?: OutfitLikeScalarWhereInput[]
    NOT?: OutfitLikeScalarWhereInput | OutfitLikeScalarWhereInput[]
    id?: IntFilter<"OutfitLike"> | number
    outfitId?: IntFilter<"OutfitLike"> | number
    userId?: IntFilter<"OutfitLike"> | number
  }

  export type UserCreateWithoutItemsInput = {
    email: string
    password: string
    nickname: string
    profileImage?: string | null
    outfits?: OutfitCreateNestedManyWithoutUserInput
    outfitLikes?: OutfitLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutItemsInput = {
    id?: number
    email: string
    password: string
    nickname: string
    profileImage?: string | null
    outfits?: OutfitUncheckedCreateNestedManyWithoutUserInput
    outfitLikes?: OutfitLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
  }

  export type ItemTagCreateWithoutItemInput = {
    tag: TagCreateNestedOneWithoutItemTagsInput
  }

  export type ItemTagUncheckedCreateWithoutItemInput = {
    id?: number
    tagId: number
  }

  export type ItemTagCreateOrConnectWithoutItemInput = {
    where: ItemTagWhereUniqueInput
    create: XOR<ItemTagCreateWithoutItemInput, ItemTagUncheckedCreateWithoutItemInput>
  }

  export type ItemTagCreateManyItemInputEnvelope = {
    data: ItemTagCreateManyItemInput | ItemTagCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type OutfitItemCreateWithoutItemInput = {
    outfit: OutfitCreateNestedOneWithoutOutfitItemsInput
  }

  export type OutfitItemUncheckedCreateWithoutItemInput = {
    id?: number
    outfitId: number
  }

  export type OutfitItemCreateOrConnectWithoutItemInput = {
    where: OutfitItemWhereUniqueInput
    create: XOR<OutfitItemCreateWithoutItemInput, OutfitItemUncheckedCreateWithoutItemInput>
  }

  export type OutfitItemCreateManyItemInputEnvelope = {
    data: OutfitItemCreateManyItemInput | OutfitItemCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutItemsInput = {
    update: XOR<UserUpdateWithoutItemsInput, UserUncheckedUpdateWithoutItemsInput>
    create: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutItemsInput, UserUncheckedUpdateWithoutItemsInput>
  }

  export type UserUpdateWithoutItemsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    outfits?: OutfitUpdateManyWithoutUserNestedInput
    outfitLikes?: OutfitLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    outfits?: OutfitUncheckedUpdateManyWithoutUserNestedInput
    outfitLikes?: OutfitLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemTagUpsertWithWhereUniqueWithoutItemInput = {
    where: ItemTagWhereUniqueInput
    update: XOR<ItemTagUpdateWithoutItemInput, ItemTagUncheckedUpdateWithoutItemInput>
    create: XOR<ItemTagCreateWithoutItemInput, ItemTagUncheckedCreateWithoutItemInput>
  }

  export type ItemTagUpdateWithWhereUniqueWithoutItemInput = {
    where: ItemTagWhereUniqueInput
    data: XOR<ItemTagUpdateWithoutItemInput, ItemTagUncheckedUpdateWithoutItemInput>
  }

  export type ItemTagUpdateManyWithWhereWithoutItemInput = {
    where: ItemTagScalarWhereInput
    data: XOR<ItemTagUpdateManyMutationInput, ItemTagUncheckedUpdateManyWithoutItemInput>
  }

  export type ItemTagScalarWhereInput = {
    AND?: ItemTagScalarWhereInput | ItemTagScalarWhereInput[]
    OR?: ItemTagScalarWhereInput[]
    NOT?: ItemTagScalarWhereInput | ItemTagScalarWhereInput[]
    id?: IntFilter<"ItemTag"> | number
    itemId?: IntFilter<"ItemTag"> | number
    tagId?: IntFilter<"ItemTag"> | number
  }

  export type OutfitItemUpsertWithWhereUniqueWithoutItemInput = {
    where: OutfitItemWhereUniqueInput
    update: XOR<OutfitItemUpdateWithoutItemInput, OutfitItemUncheckedUpdateWithoutItemInput>
    create: XOR<OutfitItemCreateWithoutItemInput, OutfitItemUncheckedCreateWithoutItemInput>
  }

  export type OutfitItemUpdateWithWhereUniqueWithoutItemInput = {
    where: OutfitItemWhereUniqueInput
    data: XOR<OutfitItemUpdateWithoutItemInput, OutfitItemUncheckedUpdateWithoutItemInput>
  }

  export type OutfitItemUpdateManyWithWhereWithoutItemInput = {
    where: OutfitItemScalarWhereInput
    data: XOR<OutfitItemUpdateManyMutationInput, OutfitItemUncheckedUpdateManyWithoutItemInput>
  }

  export type OutfitItemScalarWhereInput = {
    AND?: OutfitItemScalarWhereInput | OutfitItemScalarWhereInput[]
    OR?: OutfitItemScalarWhereInput[]
    NOT?: OutfitItemScalarWhereInput | OutfitItemScalarWhereInput[]
    id?: IntFilter<"OutfitItem"> | number
    outfitId?: IntFilter<"OutfitItem"> | number
    itemId?: IntFilter<"OutfitItem"> | number
  }

  export type WeatherCreateWithoutLocationInput = {
    date: Date | string
    tempMin?: number | null
    tempMax?: number | null
    tempAvg?: number | null
    feelsLike?: number | null
    precipitation?: number | null
    weatherIcon?: string | null
    status?: string | null
  }

  export type WeatherUncheckedCreateWithoutLocationInput = {
    date: Date | string
    tempMin?: number | null
    tempMax?: number | null
    tempAvg?: number | null
    feelsLike?: number | null
    precipitation?: number | null
    weatherIcon?: string | null
    status?: string | null
  }

  export type WeatherCreateOrConnectWithoutLocationInput = {
    where: WeatherWhereUniqueInput
    create: XOR<WeatherCreateWithoutLocationInput, WeatherUncheckedCreateWithoutLocationInput>
  }

  export type WeatherCreateManyLocationInputEnvelope = {
    data: WeatherCreateManyLocationInput | WeatherCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type OutfitCreateWithoutLocationInput = {
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    user: UserCreateNestedOneWithoutOutfitsInput
    outfitItems?: OutfitItemCreateNestedManyWithoutOutfitInput
    outfitTags?: OutfitTagCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateWithoutLocationInput = {
    id?: number
    userId: number
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    outfitItems?: OutfitItemUncheckedCreateNestedManyWithoutOutfitInput
    outfitTags?: OutfitTagUncheckedCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitCreateOrConnectWithoutLocationInput = {
    where: OutfitWhereUniqueInput
    create: XOR<OutfitCreateWithoutLocationInput, OutfitUncheckedCreateWithoutLocationInput>
  }

  export type OutfitCreateManyLocationInputEnvelope = {
    data: OutfitCreateManyLocationInput | OutfitCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type WeatherUpsertWithWhereUniqueWithoutLocationInput = {
    where: WeatherWhereUniqueInput
    update: XOR<WeatherUpdateWithoutLocationInput, WeatherUncheckedUpdateWithoutLocationInput>
    create: XOR<WeatherCreateWithoutLocationInput, WeatherUncheckedCreateWithoutLocationInput>
  }

  export type WeatherUpdateWithWhereUniqueWithoutLocationInput = {
    where: WeatherWhereUniqueInput
    data: XOR<WeatherUpdateWithoutLocationInput, WeatherUncheckedUpdateWithoutLocationInput>
  }

  export type WeatherUpdateManyWithWhereWithoutLocationInput = {
    where: WeatherScalarWhereInput
    data: XOR<WeatherUpdateManyMutationInput, WeatherUncheckedUpdateManyWithoutLocationInput>
  }

  export type WeatherScalarWhereInput = {
    AND?: WeatherScalarWhereInput | WeatherScalarWhereInput[]
    OR?: WeatherScalarWhereInput[]
    NOT?: WeatherScalarWhereInput | WeatherScalarWhereInput[]
    date?: DateTimeFilter<"Weather"> | Date | string
    locationId?: IntFilter<"Weather"> | number
    tempMin?: FloatNullableFilter<"Weather"> | number | null
    tempMax?: FloatNullableFilter<"Weather"> | number | null
    tempAvg?: FloatNullableFilter<"Weather"> | number | null
    feelsLike?: FloatNullableFilter<"Weather"> | number | null
    precipitation?: FloatNullableFilter<"Weather"> | number | null
    weatherIcon?: StringNullableFilter<"Weather"> | string | null
    status?: StringNullableFilter<"Weather"> | string | null
  }

  export type OutfitUpsertWithWhereUniqueWithoutLocationInput = {
    where: OutfitWhereUniqueInput
    update: XOR<OutfitUpdateWithoutLocationInput, OutfitUncheckedUpdateWithoutLocationInput>
    create: XOR<OutfitCreateWithoutLocationInput, OutfitUncheckedCreateWithoutLocationInput>
  }

  export type OutfitUpdateWithWhereUniqueWithoutLocationInput = {
    where: OutfitWhereUniqueInput
    data: XOR<OutfitUpdateWithoutLocationInput, OutfitUncheckedUpdateWithoutLocationInput>
  }

  export type OutfitUpdateManyWithWhereWithoutLocationInput = {
    where: OutfitScalarWhereInput
    data: XOR<OutfitUpdateManyMutationInput, OutfitUncheckedUpdateManyWithoutLocationInput>
  }

  export type LocationCreateWithoutWeatherInput = {
    sido: string
    sigungu: string
    dong: string
    code: string
    outfits?: OutfitCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutWeatherInput = {
    id?: number
    sido: string
    sigungu: string
    dong: string
    code: string
    outfits?: OutfitUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutWeatherInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutWeatherInput, LocationUncheckedCreateWithoutWeatherInput>
  }

  export type LocationUpsertWithoutWeatherInput = {
    update: XOR<LocationUpdateWithoutWeatherInput, LocationUncheckedUpdateWithoutWeatherInput>
    create: XOR<LocationCreateWithoutWeatherInput, LocationUncheckedCreateWithoutWeatherInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutWeatherInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutWeatherInput, LocationUncheckedUpdateWithoutWeatherInput>
  }

  export type LocationUpdateWithoutWeatherInput = {
    sido?: StringFieldUpdateOperationsInput | string
    sigungu?: StringFieldUpdateOperationsInput | string
    dong?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    outfits?: OutfitUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutWeatherInput = {
    id?: IntFieldUpdateOperationsInput | number
    sido?: StringFieldUpdateOperationsInput | string
    sigungu?: StringFieldUpdateOperationsInput | string
    dong?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    outfits?: OutfitUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type UserCreateWithoutOutfitsInput = {
    email: string
    password: string
    nickname: string
    profileImage?: string | null
    items?: ItemCreateNestedManyWithoutUserInput
    outfitLikes?: OutfitLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOutfitsInput = {
    id?: number
    email: string
    password: string
    nickname: string
    profileImage?: string | null
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    outfitLikes?: OutfitLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOutfitsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOutfitsInput, UserUncheckedCreateWithoutOutfitsInput>
  }

  export type LocationCreateWithoutOutfitsInput = {
    sido: string
    sigungu: string
    dong: string
    code: string
    weather?: WeatherCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutOutfitsInput = {
    id?: number
    sido: string
    sigungu: string
    dong: string
    code: string
    weather?: WeatherUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutOutfitsInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutOutfitsInput, LocationUncheckedCreateWithoutOutfitsInput>
  }

  export type OutfitItemCreateWithoutOutfitInput = {
    item: ItemCreateNestedOneWithoutOutfitItemsInput
  }

  export type OutfitItemUncheckedCreateWithoutOutfitInput = {
    id?: number
    itemId: number
  }

  export type OutfitItemCreateOrConnectWithoutOutfitInput = {
    where: OutfitItemWhereUniqueInput
    create: XOR<OutfitItemCreateWithoutOutfitInput, OutfitItemUncheckedCreateWithoutOutfitInput>
  }

  export type OutfitItemCreateManyOutfitInputEnvelope = {
    data: OutfitItemCreateManyOutfitInput | OutfitItemCreateManyOutfitInput[]
    skipDuplicates?: boolean
  }

  export type OutfitTagCreateWithoutOutfitInput = {
    tag: TagCreateNestedOneWithoutOutfitTagsInput
  }

  export type OutfitTagUncheckedCreateWithoutOutfitInput = {
    id?: number
    tagId: number
  }

  export type OutfitTagCreateOrConnectWithoutOutfitInput = {
    where: OutfitTagWhereUniqueInput
    create: XOR<OutfitTagCreateWithoutOutfitInput, OutfitTagUncheckedCreateWithoutOutfitInput>
  }

  export type OutfitTagCreateManyOutfitInputEnvelope = {
    data: OutfitTagCreateManyOutfitInput | OutfitTagCreateManyOutfitInput[]
    skipDuplicates?: boolean
  }

  export type OutfitLikeCreateWithoutOutfitInput = {
    user: UserCreateNestedOneWithoutOutfitLikesInput
  }

  export type OutfitLikeUncheckedCreateWithoutOutfitInput = {
    id?: number
    userId: number
  }

  export type OutfitLikeCreateOrConnectWithoutOutfitInput = {
    where: OutfitLikeWhereUniqueInput
    create: XOR<OutfitLikeCreateWithoutOutfitInput, OutfitLikeUncheckedCreateWithoutOutfitInput>
  }

  export type OutfitLikeCreateManyOutfitInputEnvelope = {
    data: OutfitLikeCreateManyOutfitInput | OutfitLikeCreateManyOutfitInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOutfitsInput = {
    update: XOR<UserUpdateWithoutOutfitsInput, UserUncheckedUpdateWithoutOutfitsInput>
    create: XOR<UserCreateWithoutOutfitsInput, UserUncheckedCreateWithoutOutfitsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOutfitsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOutfitsInput, UserUncheckedUpdateWithoutOutfitsInput>
  }

  export type UserUpdateWithoutOutfitsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    items?: ItemUpdateManyWithoutUserNestedInput
    outfitLikes?: OutfitLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOutfitsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    outfitLikes?: OutfitLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LocationUpsertWithoutOutfitsInput = {
    update: XOR<LocationUpdateWithoutOutfitsInput, LocationUncheckedUpdateWithoutOutfitsInput>
    create: XOR<LocationCreateWithoutOutfitsInput, LocationUncheckedCreateWithoutOutfitsInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutOutfitsInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutOutfitsInput, LocationUncheckedUpdateWithoutOutfitsInput>
  }

  export type LocationUpdateWithoutOutfitsInput = {
    sido?: StringFieldUpdateOperationsInput | string
    sigungu?: StringFieldUpdateOperationsInput | string
    dong?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    weather?: WeatherUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutOutfitsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sido?: StringFieldUpdateOperationsInput | string
    sigungu?: StringFieldUpdateOperationsInput | string
    dong?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    weather?: WeatherUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type OutfitItemUpsertWithWhereUniqueWithoutOutfitInput = {
    where: OutfitItemWhereUniqueInput
    update: XOR<OutfitItemUpdateWithoutOutfitInput, OutfitItemUncheckedUpdateWithoutOutfitInput>
    create: XOR<OutfitItemCreateWithoutOutfitInput, OutfitItemUncheckedCreateWithoutOutfitInput>
  }

  export type OutfitItemUpdateWithWhereUniqueWithoutOutfitInput = {
    where: OutfitItemWhereUniqueInput
    data: XOR<OutfitItemUpdateWithoutOutfitInput, OutfitItemUncheckedUpdateWithoutOutfitInput>
  }

  export type OutfitItemUpdateManyWithWhereWithoutOutfitInput = {
    where: OutfitItemScalarWhereInput
    data: XOR<OutfitItemUpdateManyMutationInput, OutfitItemUncheckedUpdateManyWithoutOutfitInput>
  }

  export type OutfitTagUpsertWithWhereUniqueWithoutOutfitInput = {
    where: OutfitTagWhereUniqueInput
    update: XOR<OutfitTagUpdateWithoutOutfitInput, OutfitTagUncheckedUpdateWithoutOutfitInput>
    create: XOR<OutfitTagCreateWithoutOutfitInput, OutfitTagUncheckedCreateWithoutOutfitInput>
  }

  export type OutfitTagUpdateWithWhereUniqueWithoutOutfitInput = {
    where: OutfitTagWhereUniqueInput
    data: XOR<OutfitTagUpdateWithoutOutfitInput, OutfitTagUncheckedUpdateWithoutOutfitInput>
  }

  export type OutfitTagUpdateManyWithWhereWithoutOutfitInput = {
    where: OutfitTagScalarWhereInput
    data: XOR<OutfitTagUpdateManyMutationInput, OutfitTagUncheckedUpdateManyWithoutOutfitInput>
  }

  export type OutfitTagScalarWhereInput = {
    AND?: OutfitTagScalarWhereInput | OutfitTagScalarWhereInput[]
    OR?: OutfitTagScalarWhereInput[]
    NOT?: OutfitTagScalarWhereInput | OutfitTagScalarWhereInput[]
    id?: IntFilter<"OutfitTag"> | number
    outfitId?: IntFilter<"OutfitTag"> | number
    tagId?: IntFilter<"OutfitTag"> | number
  }

  export type OutfitLikeUpsertWithWhereUniqueWithoutOutfitInput = {
    where: OutfitLikeWhereUniqueInput
    update: XOR<OutfitLikeUpdateWithoutOutfitInput, OutfitLikeUncheckedUpdateWithoutOutfitInput>
    create: XOR<OutfitLikeCreateWithoutOutfitInput, OutfitLikeUncheckedCreateWithoutOutfitInput>
  }

  export type OutfitLikeUpdateWithWhereUniqueWithoutOutfitInput = {
    where: OutfitLikeWhereUniqueInput
    data: XOR<OutfitLikeUpdateWithoutOutfitInput, OutfitLikeUncheckedUpdateWithoutOutfitInput>
  }

  export type OutfitLikeUpdateManyWithWhereWithoutOutfitInput = {
    where: OutfitLikeScalarWhereInput
    data: XOR<OutfitLikeUpdateManyMutationInput, OutfitLikeUncheckedUpdateManyWithoutOutfitInput>
  }

  export type ItemTagCreateWithoutTagInput = {
    item: ItemCreateNestedOneWithoutItemTagsInput
  }

  export type ItemTagUncheckedCreateWithoutTagInput = {
    id?: number
    itemId: number
  }

  export type ItemTagCreateOrConnectWithoutTagInput = {
    where: ItemTagWhereUniqueInput
    create: XOR<ItemTagCreateWithoutTagInput, ItemTagUncheckedCreateWithoutTagInput>
  }

  export type ItemTagCreateManyTagInputEnvelope = {
    data: ItemTagCreateManyTagInput | ItemTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type OutfitTagCreateWithoutTagInput = {
    outfit: OutfitCreateNestedOneWithoutOutfitTagsInput
  }

  export type OutfitTagUncheckedCreateWithoutTagInput = {
    id?: number
    outfitId: number
  }

  export type OutfitTagCreateOrConnectWithoutTagInput = {
    where: OutfitTagWhereUniqueInput
    create: XOR<OutfitTagCreateWithoutTagInput, OutfitTagUncheckedCreateWithoutTagInput>
  }

  export type OutfitTagCreateManyTagInputEnvelope = {
    data: OutfitTagCreateManyTagInput | OutfitTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type ItemTagUpsertWithWhereUniqueWithoutTagInput = {
    where: ItemTagWhereUniqueInput
    update: XOR<ItemTagUpdateWithoutTagInput, ItemTagUncheckedUpdateWithoutTagInput>
    create: XOR<ItemTagCreateWithoutTagInput, ItemTagUncheckedCreateWithoutTagInput>
  }

  export type ItemTagUpdateWithWhereUniqueWithoutTagInput = {
    where: ItemTagWhereUniqueInput
    data: XOR<ItemTagUpdateWithoutTagInput, ItemTagUncheckedUpdateWithoutTagInput>
  }

  export type ItemTagUpdateManyWithWhereWithoutTagInput = {
    where: ItemTagScalarWhereInput
    data: XOR<ItemTagUpdateManyMutationInput, ItemTagUncheckedUpdateManyWithoutTagInput>
  }

  export type OutfitTagUpsertWithWhereUniqueWithoutTagInput = {
    where: OutfitTagWhereUniqueInput
    update: XOR<OutfitTagUpdateWithoutTagInput, OutfitTagUncheckedUpdateWithoutTagInput>
    create: XOR<OutfitTagCreateWithoutTagInput, OutfitTagUncheckedCreateWithoutTagInput>
  }

  export type OutfitTagUpdateWithWhereUniqueWithoutTagInput = {
    where: OutfitTagWhereUniqueInput
    data: XOR<OutfitTagUpdateWithoutTagInput, OutfitTagUncheckedUpdateWithoutTagInput>
  }

  export type OutfitTagUpdateManyWithWhereWithoutTagInput = {
    where: OutfitTagScalarWhereInput
    data: XOR<OutfitTagUpdateManyMutationInput, OutfitTagUncheckedUpdateManyWithoutTagInput>
  }

  export type ItemCreateWithoutItemTagsInput = {
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutItemsInput
    outfitItems?: OutfitItemCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutItemTagsInput = {
    id?: number
    userId: number
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
    outfitItems?: OutfitItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutItemTagsInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutItemTagsInput, ItemUncheckedCreateWithoutItemTagsInput>
  }

  export type TagCreateWithoutItemTagsInput = {
    name: string
    type: string
    outfitTags?: OutfitTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutItemTagsInput = {
    id?: number
    name: string
    type: string
    outfitTags?: OutfitTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutItemTagsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutItemTagsInput, TagUncheckedCreateWithoutItemTagsInput>
  }

  export type ItemUpsertWithoutItemTagsInput = {
    update: XOR<ItemUpdateWithoutItemTagsInput, ItemUncheckedUpdateWithoutItemTagsInput>
    create: XOR<ItemCreateWithoutItemTagsInput, ItemUncheckedCreateWithoutItemTagsInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutItemTagsInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutItemTagsInput, ItemUncheckedUpdateWithoutItemTagsInput>
  }

  export type ItemUpdateWithoutItemTagsInput = {
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutItemsNestedInput
    outfitItems?: OutfitItemUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutItemTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    outfitItems?: OutfitItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type TagUpsertWithoutItemTagsInput = {
    update: XOR<TagUpdateWithoutItemTagsInput, TagUncheckedUpdateWithoutItemTagsInput>
    create: XOR<TagCreateWithoutItemTagsInput, TagUncheckedCreateWithoutItemTagsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutItemTagsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutItemTagsInput, TagUncheckedUpdateWithoutItemTagsInput>
  }

  export type TagUpdateWithoutItemTagsInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    outfitTags?: OutfitTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutItemTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    outfitTags?: OutfitTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type OutfitCreateWithoutOutfitItemsInput = {
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    user: UserCreateNestedOneWithoutOutfitsInput
    location: LocationCreateNestedOneWithoutOutfitsInput
    outfitTags?: OutfitTagCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateWithoutOutfitItemsInput = {
    id?: number
    userId: number
    locationId: number
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    outfitTags?: OutfitTagUncheckedCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitCreateOrConnectWithoutOutfitItemsInput = {
    where: OutfitWhereUniqueInput
    create: XOR<OutfitCreateWithoutOutfitItemsInput, OutfitUncheckedCreateWithoutOutfitItemsInput>
  }

  export type ItemCreateWithoutOutfitItemsInput = {
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
    user: UserCreateNestedOneWithoutItemsInput
    itemTags?: ItemTagCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutOutfitItemsInput = {
    id?: number
    userId: number
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
    itemTags?: ItemTagUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutOutfitItemsInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutOutfitItemsInput, ItemUncheckedCreateWithoutOutfitItemsInput>
  }

  export type OutfitUpsertWithoutOutfitItemsInput = {
    update: XOR<OutfitUpdateWithoutOutfitItemsInput, OutfitUncheckedUpdateWithoutOutfitItemsInput>
    create: XOR<OutfitCreateWithoutOutfitItemsInput, OutfitUncheckedCreateWithoutOutfitItemsInput>
    where?: OutfitWhereInput
  }

  export type OutfitUpdateToOneWithWhereWithoutOutfitItemsInput = {
    where?: OutfitWhereInput
    data: XOR<OutfitUpdateWithoutOutfitItemsInput, OutfitUncheckedUpdateWithoutOutfitItemsInput>
  }

  export type OutfitUpdateWithoutOutfitItemsInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOutfitsNestedInput
    location?: LocationUpdateOneRequiredWithoutOutfitsNestedInput
    outfitTags?: OutfitTagUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateWithoutOutfitItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    outfitTags?: OutfitTagUncheckedUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type ItemUpsertWithoutOutfitItemsInput = {
    update: XOR<ItemUpdateWithoutOutfitItemsInput, ItemUncheckedUpdateWithoutOutfitItemsInput>
    create: XOR<ItemCreateWithoutOutfitItemsInput, ItemUncheckedCreateWithoutOutfitItemsInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutOutfitItemsInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutOutfitItemsInput, ItemUncheckedUpdateWithoutOutfitItemsInput>
  }

  export type ItemUpdateWithoutOutfitItemsInput = {
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutItemsNestedInput
    itemTags?: ItemTagUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutOutfitItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    itemTags?: ItemTagUncheckedUpdateManyWithoutItemNestedInput
  }

  export type OutfitCreateWithoutOutfitTagsInput = {
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    user: UserCreateNestedOneWithoutOutfitsInput
    location: LocationCreateNestedOneWithoutOutfitsInput
    outfitItems?: OutfitItemCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateWithoutOutfitTagsInput = {
    id?: number
    userId: number
    locationId: number
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    outfitItems?: OutfitItemUncheckedCreateNestedManyWithoutOutfitInput
    outfitLikes?: OutfitLikeUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitCreateOrConnectWithoutOutfitTagsInput = {
    where: OutfitWhereUniqueInput
    create: XOR<OutfitCreateWithoutOutfitTagsInput, OutfitUncheckedCreateWithoutOutfitTagsInput>
  }

  export type TagCreateWithoutOutfitTagsInput = {
    name: string
    type: string
    itemTags?: ItemTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutOutfitTagsInput = {
    id?: number
    name: string
    type: string
    itemTags?: ItemTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutOutfitTagsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutOutfitTagsInput, TagUncheckedCreateWithoutOutfitTagsInput>
  }

  export type OutfitUpsertWithoutOutfitTagsInput = {
    update: XOR<OutfitUpdateWithoutOutfitTagsInput, OutfitUncheckedUpdateWithoutOutfitTagsInput>
    create: XOR<OutfitCreateWithoutOutfitTagsInput, OutfitUncheckedCreateWithoutOutfitTagsInput>
    where?: OutfitWhereInput
  }

  export type OutfitUpdateToOneWithWhereWithoutOutfitTagsInput = {
    where?: OutfitWhereInput
    data: XOR<OutfitUpdateWithoutOutfitTagsInput, OutfitUncheckedUpdateWithoutOutfitTagsInput>
  }

  export type OutfitUpdateWithoutOutfitTagsInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOutfitsNestedInput
    location?: LocationUpdateOneRequiredWithoutOutfitsNestedInput
    outfitItems?: OutfitItemUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateWithoutOutfitTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    outfitItems?: OutfitItemUncheckedUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type TagUpsertWithoutOutfitTagsInput = {
    update: XOR<TagUpdateWithoutOutfitTagsInput, TagUncheckedUpdateWithoutOutfitTagsInput>
    create: XOR<TagCreateWithoutOutfitTagsInput, TagUncheckedCreateWithoutOutfitTagsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutOutfitTagsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutOutfitTagsInput, TagUncheckedUpdateWithoutOutfitTagsInput>
  }

  export type TagUpdateWithoutOutfitTagsInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    itemTags?: ItemTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutOutfitTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    itemTags?: ItemTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type OutfitCreateWithoutOutfitLikesInput = {
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    user: UserCreateNestedOneWithoutOutfitsInput
    location: LocationCreateNestedOneWithoutOutfitsInput
    outfitItems?: OutfitItemCreateNestedManyWithoutOutfitInput
    outfitTags?: OutfitTagCreateNestedManyWithoutOutfitInput
  }

  export type OutfitUncheckedCreateWithoutOutfitLikesInput = {
    id?: number
    userId: number
    locationId: number
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
    outfitItems?: OutfitItemUncheckedCreateNestedManyWithoutOutfitInput
    outfitTags?: OutfitTagUncheckedCreateNestedManyWithoutOutfitInput
  }

  export type OutfitCreateOrConnectWithoutOutfitLikesInput = {
    where: OutfitWhereUniqueInput
    create: XOR<OutfitCreateWithoutOutfitLikesInput, OutfitUncheckedCreateWithoutOutfitLikesInput>
  }

  export type UserCreateWithoutOutfitLikesInput = {
    email: string
    password: string
    nickname: string
    profileImage?: string | null
    items?: ItemCreateNestedManyWithoutUserInput
    outfits?: OutfitCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOutfitLikesInput = {
    id?: number
    email: string
    password: string
    nickname: string
    profileImage?: string | null
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    outfits?: OutfitUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOutfitLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOutfitLikesInput, UserUncheckedCreateWithoutOutfitLikesInput>
  }

  export type OutfitUpsertWithoutOutfitLikesInput = {
    update: XOR<OutfitUpdateWithoutOutfitLikesInput, OutfitUncheckedUpdateWithoutOutfitLikesInput>
    create: XOR<OutfitCreateWithoutOutfitLikesInput, OutfitUncheckedCreateWithoutOutfitLikesInput>
    where?: OutfitWhereInput
  }

  export type OutfitUpdateToOneWithWhereWithoutOutfitLikesInput = {
    where?: OutfitWhereInput
    data: XOR<OutfitUpdateWithoutOutfitLikesInput, OutfitUncheckedUpdateWithoutOutfitLikesInput>
  }

  export type OutfitUpdateWithoutOutfitLikesInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOutfitsNestedInput
    location?: LocationUpdateOneRequiredWithoutOutfitsNestedInput
    outfitItems?: OutfitItemUpdateManyWithoutOutfitNestedInput
    outfitTags?: OutfitTagUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateWithoutOutfitLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    outfitItems?: OutfitItemUncheckedUpdateManyWithoutOutfitNestedInput
    outfitTags?: OutfitTagUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type UserUpsertWithoutOutfitLikesInput = {
    update: XOR<UserUpdateWithoutOutfitLikesInput, UserUncheckedUpdateWithoutOutfitLikesInput>
    create: XOR<UserCreateWithoutOutfitLikesInput, UserUncheckedCreateWithoutOutfitLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOutfitLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOutfitLikesInput, UserUncheckedUpdateWithoutOutfitLikesInput>
  }

  export type UserUpdateWithoutOutfitLikesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    items?: ItemUpdateManyWithoutUserNestedInput
    outfits?: OutfitUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOutfitLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    outfits?: OutfitUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemCreateManyUserInput = {
    id?: number
    category: number
    subcategory: number
    brand?: string | null
    color: number
    size?: string | null
    season: number
    purchaseDate?: Date | string | null
    image?: string | null
    isDeleted?: boolean
  }

  export type OutfitCreateManyUserInput = {
    id?: number
    locationId: number
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
  }

  export type OutfitLikeCreateManyUserInput = {
    id?: number
    outfitId: number
  }

  export type ItemUpdateWithoutUserInput = {
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    itemTags?: ItemTagUpdateManyWithoutItemNestedInput
    outfitItems?: OutfitItemUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    itemTags?: ItemTagUncheckedUpdateManyWithoutItemNestedInput
    outfitItems?: OutfitItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    subcategory?: IntFieldUpdateOperationsInput | number
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    color?: IntFieldUpdateOperationsInput | number
    size?: NullableStringFieldUpdateOperationsInput | string | null
    season?: IntFieldUpdateOperationsInput | number
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OutfitUpdateWithoutUserInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    location?: LocationUpdateOneRequiredWithoutOutfitsNestedInput
    outfitItems?: OutfitItemUpdateManyWithoutOutfitNestedInput
    outfitTags?: OutfitTagUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    outfitItems?: OutfitItemUncheckedUpdateManyWithoutOutfitNestedInput
    outfitTags?: OutfitTagUncheckedUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutfitLikeUpdateWithoutUserInput = {
    outfit?: OutfitUpdateOneRequiredWithoutOutfitLikesNestedInput
  }

  export type OutfitLikeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitLikeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type ItemTagCreateManyItemInput = {
    id?: number
    tagId: number
  }

  export type OutfitItemCreateManyItemInput = {
    id?: number
    outfitId: number
  }

  export type ItemTagUpdateWithoutItemInput = {
    tag?: TagUpdateOneRequiredWithoutItemTagsNestedInput
  }

  export type ItemTagUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type ItemTagUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitItemUpdateWithoutItemInput = {
    outfit?: OutfitUpdateOneRequiredWithoutOutfitItemsNestedInput
  }

  export type OutfitItemUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitItemUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type WeatherCreateManyLocationInput = {
    date: Date | string
    tempMin?: number | null
    tempMax?: number | null
    tempAvg?: number | null
    feelsLike?: number | null
    precipitation?: number | null
    weatherIcon?: string | null
    status?: string | null
  }

  export type OutfitCreateManyLocationInput = {
    id?: number
    userId: number
    date: Date | string
    weatherTempAvg?: number | null
    mainImage?: string | null
    memo?: string | null
  }

  export type WeatherUpdateWithoutLocationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    tempMin?: NullableFloatFieldUpdateOperationsInput | number | null
    tempMax?: NullableFloatFieldUpdateOperationsInput | number | null
    tempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    feelsLike?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherIcon?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WeatherUncheckedUpdateWithoutLocationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    tempMin?: NullableFloatFieldUpdateOperationsInput | number | null
    tempMax?: NullableFloatFieldUpdateOperationsInput | number | null
    tempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    feelsLike?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherIcon?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WeatherUncheckedUpdateManyWithoutLocationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    tempMin?: NullableFloatFieldUpdateOperationsInput | number | null
    tempMax?: NullableFloatFieldUpdateOperationsInput | number | null
    tempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    feelsLike?: NullableFloatFieldUpdateOperationsInput | number | null
    precipitation?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherIcon?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutfitUpdateWithoutLocationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOutfitsNestedInput
    outfitItems?: OutfitItemUpdateManyWithoutOutfitNestedInput
    outfitTags?: OutfitTagUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    outfitItems?: OutfitItemUncheckedUpdateManyWithoutOutfitNestedInput
    outfitTags?: OutfitTagUncheckedUpdateManyWithoutOutfitNestedInput
    outfitLikes?: OutfitLikeUncheckedUpdateManyWithoutOutfitNestedInput
  }

  export type OutfitUncheckedUpdateManyWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weatherTempAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutfitItemCreateManyOutfitInput = {
    id?: number
    itemId: number
  }

  export type OutfitTagCreateManyOutfitInput = {
    id?: number
    tagId: number
  }

  export type OutfitLikeCreateManyOutfitInput = {
    id?: number
    userId: number
  }

  export type OutfitItemUpdateWithoutOutfitInput = {
    item?: ItemUpdateOneRequiredWithoutOutfitItemsNestedInput
  }

  export type OutfitItemUncheckedUpdateWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitItemUncheckedUpdateManyWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitTagUpdateWithoutOutfitInput = {
    tag?: TagUpdateOneRequiredWithoutOutfitTagsNestedInput
  }

  export type OutfitTagUncheckedUpdateWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitTagUncheckedUpdateManyWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitLikeUpdateWithoutOutfitInput = {
    user?: UserUpdateOneRequiredWithoutOutfitLikesNestedInput
  }

  export type OutfitLikeUncheckedUpdateWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitLikeUncheckedUpdateManyWithoutOutfitInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ItemTagCreateManyTagInput = {
    id?: number
    itemId: number
  }

  export type OutfitTagCreateManyTagInput = {
    id?: number
    outfitId: number
  }

  export type ItemTagUpdateWithoutTagInput = {
    item?: ItemUpdateOneRequiredWithoutItemTagsNestedInput
  }

  export type ItemTagUncheckedUpdateWithoutTagInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type ItemTagUncheckedUpdateManyWithoutTagInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitTagUpdateWithoutTagInput = {
    outfit?: OutfitUpdateOneRequiredWithoutOutfitTagsNestedInput
  }

  export type OutfitTagUncheckedUpdateWithoutTagInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }

  export type OutfitTagUncheckedUpdateManyWithoutTagInput = {
    id?: IntFieldUpdateOperationsInput | number
    outfitId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}