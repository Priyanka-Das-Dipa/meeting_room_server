import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search function
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  //   filter Function
  filter() {
    const queryObj = { ...this.query };

    // Filtering
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "range",
      "page",
      "fields",
      "capacity",
      "roomsId",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // range
  range() {
    const range = this.query.range;
    if (range) {
      const newRange = (range as string).split("-");
      const lowestPrice = Number(newRange[0]);
      const highestPrice = Number(newRange[1]);
      this.modelQuery = this.modelQuery.find({
        pricePerSlot: { $gte: lowestPrice, $lte: highestPrice },
      });
    }
    return this;
  }

  // Capacity

  capacity() {
    const capacity = this?.query?.capacity;
    if (capacity) {
      const newCapacity = (capacity as string).split("-");
      const lowestPrice = Number(newCapacity[0]);
      const highestPrice = Number(newCapacity[1]);
      this.modelQuery = this.modelQuery.find({
        capacity: { $gte: lowestPrice, $lte: highestPrice },
      });
    }
    return this;
  }

  //   Sorting
  sort() {
    // const sort = this?.query?.sort || "-createdAt";
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  //  Limit
  limit() {
    const limit = Number(this?.query?.limit || 6);
    this.modelQuery = this.modelQuery.find().limit(limit as number);
    return this;
  }

  // 

  //   Pagination
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 6;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  async countTotal() {
    const totalQuery = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQuery);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 6;
    const totalPage = Math.ceil(total / limit);
    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
