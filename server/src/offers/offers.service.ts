import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Offer } from '@prisma/client';
import { CreateOfferDto, UpdateOfferDto } from './offers.dto';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    try {
      const {
        title,
        description,
        summary,
        requirements,
        experience,
        pay,
        job_type,
        workdays,
        urgent,
      } = createOfferDto;

      return this.prisma.offer.create({
        data: {
          title,
          description,
          summary,
          requirements,
          experience,
          pay,
          job_type,
          workdays,
          urgent,
        },
      });
    } catch (error) {
      throw new Error('Failed to create offer');
    }
  }

  async getAllOffers(): Promise<Offer[]> {
    return this.prisma.offer.findMany({ include: { posts: true } });
  }

  async getOfferById(offerId: string): Promise<Offer | null> {
    return this.prisma.offer.findUnique({
      where: {
        offer_id: offerId,
      },
      include: {
        posts: {
          include: {
            candidate: true,
          },
        },
      },
    });
  }

  async updateOffer(
    offerId: string,
    updateOfferDto: UpdateOfferDto,
  ): Promise<Offer | null> {
    try {
      const {
        title,
        description,
        summary,
        requirements,
        experience,
        pay,
        job_type,
        workdays,
        urgent,
      } = updateOfferDto;

      return this.prisma.offer.update({
        where: {
          offer_id: offerId,
        },
        data: {
          title,
          description,
          summary: { set: summary },
          requirements: { set: requirements },
          experience,
          pay,
          job_type,
          workdays,
          urgent,
        },
      });
    } catch (error) {
      throw new Error('Failed to update offer');
    }
  }

  async deleteOffer(offerId: string): Promise<Offer | null> {
    // Delete all posts related to the offer
    await this.prisma.post.deleteMany({
      where: {
        offer_id: offerId,
      },
    });

    // Delete all candidates related to the offer
    await this.prisma.candidate.deleteMany({
      where: {
        posts: {
          some: {
            offer_id: offerId,
          },
        },
      },
    });

    // Delete the offer itself
    return this.prisma.offer.delete({
      where: {
        offer_id: offerId,
      },
    });
  }
}
