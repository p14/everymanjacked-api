import { injectable, unmanaged } from 'inversify';
import {
    CallbackWithoutResult,
    Document,
    FilterQuery,
    FlattenMaps,
    LeanDocument,
    Model,
    PipelineStage,
    ProjectionType,
    Schema,
    Types,
    UpdateQuery,
    UpdateWithAggregationPipeline,
    _LeanDocument,
    model,
} from 'mongoose';

@injectable()
export default class Repository<TModel extends Document> {
    private name: string;

    private schema: Schema;

    protected Model: Model<TModel>;

    public constructor(
        @unmanaged() name: string,
        @unmanaged() schema: Schema,
    ) {
        this.name = name;
        this.schema = schema;

        schema.set('toObject', { versionKey: false, virtuals: true });
        schema.set('toJSON', { versionKey: false, virtuals: true });

        this.Model = model<TModel>(this.name, this.schema);
    }

    public getName(): string {
        return this.name;
    }

    public getModel(): Model<TModel> {
        return this.Model;
    }

    public async save(
        document: any,
    ) {
        return new this.Model(document).save();
    }

    public async find(
        query: FilterQuery<TModel>,
        projection?: ProjectionType<TModel>,
    ) {
        return this.Model.find(query, projection);
    }

    public async findById(
        id: string | Types.ObjectId,
        projection?: ProjectionType<TModel>,
    ): Promise<FlattenMaps<TModel>> {
        const response = await this.Model.findById(id, projection);
        if (!response) {
            throw new Error(`Document in ${this.name} collection could not be found.`)
        }
        return response.toJSON();
    }

    public async findOne(
        query: FilterQuery<TModel>,
    ) {
        const response = await this.Model.findOne(query);
        if (!response) {
            throw new Error(`Document in ${this.name} collection could not be found.`);
        }
        return response.toJSON();
    }

    public async findOneAndUpdate(
        query: FilterQuery<TModel>,
        document: UpdateWithAggregationPipeline | UpdateQuery<TModel>,
    ) {
        const response = await this.Model.findOneAndUpdate(query, document, { new: true, runValidators: true, returnDocument: 'after' });
        if (!response) {
            throw new Error(`Document in ${this.name} collection could not be found.`);
        }
        return response.toJSON();
    }

    public async update(
        id: Types.ObjectId,
        document: UpdateWithAggregationPipeline | UpdateQuery<TModel>,
    ) {
        return this.Model.updateOne({ _id: id } as FilterQuery<TModel>, document);
    }

    public async updateMany(
        query: FilterQuery<TModel>,
        document: UpdateWithAggregationPipeline | UpdateQuery<TModel>,
    ) {
        return this.Model.updateMany(query, document);
    }

    public async updateByQuery(
        query: FilterQuery<TModel>,
        document: UpdateWithAggregationPipeline | UpdateQuery<TModel>,
    ) {
        return this.Model.updateOne(query, document);
    }

    public async deleteOne(
        id: Types.ObjectId,
        callback?: CallbackWithoutResult,
    ) {
        const response = await this.Model.deleteOne({ _id: id } as FilterQuery<TModel>, callback);
        if (!response.acknowledged) {
            throw new Error(`Document in ${this.name} collection could not be found.`);
        }
        return response;
    }

    public async aggregate(
        query: PipelineStage[],
    ) {
        return this.Model.aggregate(query);
    }
}
