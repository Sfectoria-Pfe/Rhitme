import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './candidates.dto';
import { Candidate } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  async createCandidate(
    createCandidateDto: CreateCandidateDto,
    cvUrl: string,
  ): Promise<Candidate> {
    try {
      const { offer_id, ...candidateData } = createCandidateDto;

      const candidate = await this.prisma.candidate.create({
        data: {
          ...candidateData,
          cv: cvUrl,
        },
      });

      await this.prisma.post.create({
        data: {
          offer: { connect: { offer_id } },
          candidate: { connect: { candidate_id: candidate.candidate_id } },
          created_at: new Date(),
          accuracy: 0,
        },
      });

      return candidate;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to create candidate');
    }
  }

  async uploadCv(file: any): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      );
      console.log(result.secure_url);
      return result.secure_url;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCandidate(candidateId: string): Promise<void> {
    try {
      await this.prisma.post.deleteMany({
        where: {
          candidate_id: candidateId,
        },
      });

      await this.prisma.candidate.delete({
        where: {
          candidate_id: candidateId,
        },
      });
    } catch (error) {
      throw new Error('Failed to delete candidate');
    }
  }

  async findCandidatesByOfferId(offerId: string): Promise<Candidate[]> {
    try {
      const candidates = await this.prisma.candidate.findMany({
        where: {
          posts: {
            some: {
              offer_id: offerId,
            },
          },
        },
      });

      return candidates;
    } catch (error) {
      throw new Error('Failed to find candidates by offer ID');
    }
  }
}
