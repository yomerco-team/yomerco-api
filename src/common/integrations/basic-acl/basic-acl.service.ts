import { Injectable, HttpService, Inject, HttpException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import appConfig from '../../../config/app.config';

import { CreateAclUserInput } from './dto/create-acl-user-input.dto';
import { CreateAclUserOutput } from './dto/create-acl-user-output.dto';

@Injectable()
export class BasicAclService {
  constructor (
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    private readonly httpService: HttpService
  ) {}

  public async getToken (): Promise<string> {
    const {
      acl: { baseUrl, companyUuid, email, password }
    } = this.appConfiguration;

    const response = await this.httpService.axiosRef({
      url: `${baseUrl}users/login-admin`,
      method: 'post',
      data: {
        companyUuid,
        email,
        password
      }
    });

    const { data } = response;
    const { accessToken } = data;
    return accessToken;
  }

  public async createUser (createAclUserInput: CreateAclUserInput): Promise<CreateAclUserOutput> {
    try {
      const token = await this.getToken();

      const {
        acl: { baseUrl, companyUuid }
      } = this.appConfiguration;

      const response = await this.httpService.axiosRef({
        url: `${baseUrl}users`,
        method: 'post',
        headers: {
          'company-uuid': companyUuid,
          Authorization: `Bearer ${token}`
        },
        data: {
          companyUuid,
          email: createAclUserInput.email,
          password: createAclUserInput.password,
          phone: createAclUserInput.phone,
          roleCode: createAclUserInput.roleCode,
          anonymous: createAclUserInput.anonymous
        }
      });

      const { data } = response;

      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.statusCode,
        error.response.data.message
      );
    }
  }
}
