import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { From, FormDocument } from './schemas/form_schema';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormService {
  constructor(@InjectModel(From.name) private readonly formModel: Model<FormDocument>) {}

  async create(createFormDto: CreateFormDto): Promise<FormDocument> {
    try {
      const createdForm = new this.formModel(createFormDto);
      return await createdForm.save();
    } catch (error) {
      throw new Error(`Failed to create form: ${error.message}`);
    }
  }

  
  async findAll(): Promise<FormDocument[]> {
    try {
      return await this.formModel.find().exec();
    } catch (error) {
      throw new NotFoundException(`An unexpected error happened while getting the forms`);
    }
  }


  async findById(id: string): Promise<FormDocument> {
    try {
      return await this.formModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`Form with ID ${id} not found`);
    }
  }

  async update(id: string, updateFormDto: Partial<CreateFormDto>): Promise<FormDocument> {
    try {
      const existingForm = await this.formModel.findByIdAndUpdate(id, updateFormDto, { new: true }).exec();
      if (!existingForm) {
        throw new NotFoundException(`Form with ID ${id} not found`);
      }
      return existingForm;
    } catch (error) {
      throw new Error(`Failed to update form with ID ${id}: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.formModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Form with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Failed to delete form with ID ${id}: ${error.message}`);
    }
  }
}
