import { Controller } from '@nestjs/common';
import { CrmService } from './crm.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("CRM")
@Controller('crm')
export class CrmController {
    constructor(private readonly crmService: CrmService) { }
}
