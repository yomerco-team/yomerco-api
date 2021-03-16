import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Parameter } from './parameter.entity';

import { GetParameterValueInput } from './dto/get-parameter-value-input.dto';

@Injectable()
export class ParametersService {
  constructor (
    @InjectRepository(Parameter)
    private readonly parameterRepository: Repository<Parameter>
  ) {}

  /**
   * function to get the parameter value of a parameter
   *
   * @param {GetParameterValueInput} getParameterValueInput
   * @return {*}  {Promise<string>}
   * @memberof ParametersService
   */
  public async getParameterValue (getParameterValueInput: GetParameterValueInput): Promise<string> {
    const { name } = getParameterValueInput;

    const parameter = await this.parameterRepository.createQueryBuilder('p')
      .where('p.name = :name', { name })
      .getOne();

    if (!parameter) {
      throw new NotFoundException(`can't get the parameter ${name}.`);
    }

    return parameter.value;
  }
}
