import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { CreateRole } from './DTO/create-role-dto';
import { RoleService } from './role.service';
import { Response } from 'express';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @IsPublic()
    @Get("getRolesCompany/:id")
    async getAllRolesByCompany(@Res() res: Response, @Param() params) {
        try {
            const roles = await this.roleService.getRolesCompany(params.id);
            return res.status(HttpStatus.OK).json({ message: "Roles fetched successfully!", data: roles });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch roles!", error: error.message });
        }
    }

    @Post("create")
    async createRole(@Res() res: Response, @Body() createRole: CreateRole) {
        try {
            const role = await this.roleService.createRole(createRole);
            return res.status(HttpStatus.OK).json({ message: "Role created successfully!", data: role });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to create role!", error: error.message });
        }
    }

    @Patch("update/:id")
    async updateRole(@Res() res: Response, @Body() updateRole: any, @Param() params) {
        try {
            const role = await this.roleService.updateRole(params.id, updateRole);
            return res.status(HttpStatus.OK).json({ message: "Role updated successfully!", data: role });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to update role!", error: error.message });
        }
    }

    @Delete("delete/:id")
    async deleteRole(@Res() res: Response, @Param() params) {
        try {
            await this.roleService.deleteRole(params.id);
            return res.status(HttpStatus.OK).json({ message: "Role deleted successfully!" });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to delete role!", error: error.message });
        }
    }
}
