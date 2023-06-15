import {NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {AboutComponent} from './About/about/about.component';
import {SliderComponent } from './Slider/slider/slider.component';
import { ShopComponent } from './Shop/shop/shop.component';
import { BlogComponent } from './Blog/blog/blog.component';
import { ContactComponent } from './Contact/contact/contact.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';
import { CartComponent } from './Cart/cart/cart.component';
import { CheckoutComponent } from './Checkout/checkout/checkout.component';
import { WishlistComponent } from './Wishlist/wishlist/wishlist.component';
import { BlogDeatilsComponent } from './Blog/blog-deatils/blog-deatils.component';
import { HeaderComponent } from './Header/header/header.component';
import { AcountComponent } from './Account/acount/acount.component';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { ForgetPasswordComponent } from './ForgetPassword/forget-password/forget-password.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

const routes: Routes = [
  {path: '', component: SliderComponent },
  {path: 'about', component: AboutComponent },
  {path: 'shop', component: ShopComponent },
  {path:'blog',component:BlogComponent},
  {path:'contact',component:ContactComponent},
  {path:'product-details/:id',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'blog-details/:id',component:BlogDeatilsComponent},
  {path:'acount',component:AcountComponent},
  {path:'user-profile',component:UserProfileComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'paymentSuccess',component:PaymentSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
