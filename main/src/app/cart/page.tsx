'use client';

import { useState } from 'react';
import { ChevronLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCourseStore } from '../../../store/useStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    getCartSubtotal,
    getCartTotal,
    hasHydrated,
  } = useCourseStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState('');

  // Wait for hydration to complete
  if (!hasHydrated) {
    return (
      <div className='min-h-screen bg-[#FAFAFA] flex items-center justify-center'> 
        <div className='text-lg'>Loading...</div>
      </div>
    );
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const subtotal = getCartSubtotal();
  const discount = 0.0;
  const total = getCartTotal();

  return (
    <>
      <div className='flex-col items-center justify-center gap-2.5 shadow-sm bg-[#FAFAFA] md:px-25 md:pt-8.75 pb-20 p-5 '>
        {/* Breadcrumb Navigation */}
        <div className='w-full h-9.5 md:h-[8.75px] flex items-center justify-between'>
          <div className='flex items-center justify-start gap-2'>
            <Link
              href='/'
              className='text-sm text-[#737373] hover:text-gray-900'
            >
              Home
            </Link>
            <ChevronLeft className='w-4 h-4 rotate-180 text-gray-400' />
            <span className='text-sm font-medium text-gray-900'>Cart</span>
          </div>
        </div>

        <div className='w-full mx-auto py-6'>
          {/* Page Title */}
          <h1 className='text-2xl font-bold text-gray-900 mb-8'>Cart</h1>

          {cartItems.length === 0 ? (
            <div className='w-full h-[575px] flex flex-col items-center justify-center'>
              <div className='w-[295px] h-auto flex flex-col gap-2.5 items-center'>
                <div>
                  <div className='w-[180px] h-[180px] mb-4'>
                    <Image
                      src={'/images/cart-empty.svg'}
                      alt={'empty cart'}
                      width={180}
                      height={180}
                      className='w-full h-full object-cover rounded-lg'
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <h2 className='text-[#151515] text-lg md:text-[26px] font-bold text-center'>
                    Your cart is empty
                  </h2>
                  <h3 className='text-[#737373] text-[13px] md:text-[15px] leading-[24px] font-medium text-center'>
                    Add a course to start your journey to exam success!
                  </h3>
                </div>
                <Link
                  href='/'
                  className='mt-2.5 md:mt-5 text-[13px] md:text-[15px] font-semibold text-white bg-[#007AFF] w-40 md:w-[175px] h-10.5 md:h-[45px] flex items-center justify-center rounded-[2px]'
                >
                  Browse courses
                </Link>
              </div>
            </div>
          ) : (
            <div className='grid lg:grid-cols-3 gap-8'>
              {/* Cart Items */}
              <div className='lg:col-span-2'>
                {/* Select All */}
                <div className='flex items-center gap-3 mb-6'>
                  <Checkbox
                    id='select-all'
                    checked={selectedItems.length === cartItems.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <label
                    htmlFor='select-all'
                    className='text-sm font-medium text-gray-700'
                  >
                    Select all
                  </label>
                </div>

                {/* Cart Items List */}
                <div className='space-y-4'>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className='w-[335px] md:w-[830px] h-[198px] md:h-40'
                    >
                      <div className='flex gap-2 md:gap-4'>
                        {/* Checkbox */}
                        <div className='flex-shrink-0 pt-1'>
                          <Checkbox
                            id={`item-${item.id}`}
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleSelectItem(item.id, checked as boolean)
                            }
                          />
                        </div>
                        <div className='w-[315px] md:w-200 h-[198px] md:h-40 flex flex-col md:flex-row items-center md:items-start gap-4 p-3 md:py-4.5 md:px-3.5 bg-white rounded-lg border border-gray-200 shadow-sm'>
                          {/* Course Image */}
                          <div className='hidden md:block flex-shrink-0'>
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.name}
                              width={196}
                              height={128}
                              className='w-[196px] h-[128px] object-cover rounded-lg'
                            />
                          </div>
                          <div className='md:hidden flex-shrink-0'>
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.name}
                              width={290}
                              height={80}
                              className='w-[290px] h-[80px] object-cover rounded-lg'
                            />
                          </div>

                          {/* Course Details */}
                          <div className='w-[290px] md:w-full h-[77px] md:h-full flex justify-between'>
                            <div className='h-full w-[85%] md:w-[70%] flex flex-col justify-between'>
                              <div>
                                <h3 className='text-xs md:text-base font-semibold text-[#081021] mb-2'>
                                  {item.name}
                                </h3>
                                <p className='text-[10px] md:text-sm text-[#737373] font-medium mb-3 line-clamp-2 md:hidden'>
                                  {item.description.substring(0, 50)}
                                </p>
                                <p className='text-[10px] md:text-sm text-[#737373] font-medium mb-3 line-clamp-2 hidden md:block'>
                                  {item.description}
                                </p>
                              </div>

                              {/* Date and Time */}
                              <div className='flex items-center gap-2 md:gap-6 text-[10px] md:text-xs text-[#646464]'>
                                <div className='flex items-center gap-1 md:gap-2'>
                                  <Calendar className='w-3 md:w-4 h-3 md:h-4' />
                                  <span>{item.date}</span>
                                </div>
                                <div className='flex items-center gap-1 md:gap-2'>
                                  <Clock className='w-3 md:w-4 h-3 md:h-4' />
                                  <span>{item.duration}</span>
                                </div>
                              </div>
                            </div>

                            {/* Price */}
                            <div className='w-[15%] h-full md:h-[127px] flex flex-col justify-between items-end text-end'>
                              <div>
                                <div className='text-[8px] md:text-sm text-gray-400 line-through mb-1'>
                                  £{item.oldPrice.toFixed(2)}
                                </div>
                                <div className='text-xs md:text-xl font-semibold md:font-bold text-gray-900'>
                                  £{item.price.toFixed(2)}
                                </div>
                              </div>

                              {/* Remove Button */} 
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className='w-auto md:w-20 h-auto md:h-10 py-0.5 px-1.5 md:px-0 md:py-0 text-[9px] md:text-sm text-red-500 hover:text-red-700 font-semibold border border-[#ECECEC] rounded:none md:rounded-lg cursor-pointer'
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className='lg:col-span-1'>
                <div className='bg-white rounded-lg border border-gray-200 p-6 sticky top-6'>
                  <h2 className='text-xs md:text-lg font-semibold text-gray-900 mb-6'>
                    Order summary
                  </h2>

                  <div className='space-y-4 mb-6'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-[#737373] md:text-base text-[10px] font-medium'>Subtotal</span>
                      <span className='text-xs md:text-base font-semibold text-[#081021]'>
                        £{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-[#737373] text-[10px] md:text-sm font-medium'>Discount</span>
                      <span className='text-xs md:text-base font-semibold text-[#081021]'>
                        £{discount.toFixed(2)}
                      </span>
                    </div>
                    <div className='border-t pt-4'>
                      <div className='flex justify-between text-lg font-semibold'>
                        <span className='text-[#737373] text-[10px] md:text-sm font-medium'>Total</span>
                        <span className='text-xs md:text-lg font-semibold text-[#081021]'>£{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className='mb-6'>
                    <div className='flex items-center gap-2'>
                      <Input
                        placeholder='Add promo code'
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className='flex-1'
                      />
                      <Button
                        variant='outline'
                        className='bg-black text-white hover:bg-gray-800 w-[73px] h-[40px] text-xs rounded-[3px]'
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button className='w-full h-12.5 rounded-[2px] bg-blue-600 hover:bg-blue-700 text-white py-3 text-xs md:text-base font-medium'>
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
