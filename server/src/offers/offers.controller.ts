import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { UpdateOfferDto, CreateOfferDto } from './offers.dto';
import { Offer } from '.prisma/client';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.createOffer(createOfferDto);
  }

  @Get()
  async findAll(): Promise<Offer[]> {
    return this.offersService.getAllOffers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Offer> {
    return this.offersService.getOfferById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ): Promise<Offer> {
    return this.offersService.updateOffer(id, updateOfferDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Offer> {
    return this.offersService.deleteOffer(id);
  }
}
