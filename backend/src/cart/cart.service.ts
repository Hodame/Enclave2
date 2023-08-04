import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { IUser } from 'src/types/user';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createCartDto: CreateCartDto, user: IUser) {
    const product = await this.productRepository.findOne({
      where: {
        id: createCartDto.productId,
      },
    });

    const cart = await this.cartRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!product) throw new BadRequestException("This product doesn't exists");
    if (!cart) throw new BadRequestException("This cart doesn't exists");

    await this.cartItemRepository.insert({
      product: { id: product.id },
      cart: { id: cart.id },
    });
    return;
  }

  async findCart(userId: string) {
    const cart = await this.cartRepository.findOne({
      relations: {
        items: {
          product: true,
        },
      },
      where: {
        user: {
          id: userId,
        },
      },
    });
    return cart;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
