import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './candidates.dto';
import { Candidate } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cv'))
  async create(
    @Body() createCandidateDto: CreateCandidateDto,
    @UploadedFile() cv,
  ) {
    const cvUrl = await this.candidatesService.uploadCv(cv);
    console.log(cv);
    console.log(createCandidateDto);
    return this.candidatesService.createCandidate(createCandidateDto, cvUrl);
  }

  @Delete(':id')
  async deleteCandidate(@Param('id') candidateId: string): Promise<void> {
    return this.candidatesService.deleteCandidate(candidateId);
  }

  @Get('offer/:id')
  async findCandidatesByOfferId(
    @Param('id') offerId: string,
  ): Promise<Candidate[]> {
    return this.candidatesService.findCandidatesByOfferId(offerId);
  }
}
