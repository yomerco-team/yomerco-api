import { Reference } from '../../references/reference.entity';
import { City } from '../../cities/city.entity';

export class CreateFromReferenceInput {
  readonly city: City;

  readonly reference: Reference;

  readonly desiredMarginPercentage: number;

  readonly discountValue?: number;

  readonly discountPercentage?: number;
}