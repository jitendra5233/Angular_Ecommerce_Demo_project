import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './Header/header/header.component';
import { SliderComponent } from './Slider/slider/slider.component';
import { FooterComponent } from './Footer/footer/footer.component';
import { AboutComponent } from './About/about/about.component';
import { ShopComponent } from './Shop/shop/shop.component';
import { BlogComponent } from './Blog/blog/blog.component';
import { ContactComponent } from './Contact/contact/contact.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';
import { CartComponent } from './Cart/cart/cart.component';
import { CheckoutComponent } from './Checkout/checkout/checkout.component';
import { WishlistComponent } from './Wishlist/wishlist/wishlist.component';
import { BlogDeatilsComponent } from './Blog/blog-deatils/blog-deatils.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AcountComponent } from './Account/acount/acount.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { ForgetPasswordComponent } from './ForgetPassword/forget-password/forget-password.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BannerComponent } from './Banner/banner/banner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    FooterComponent,
    AboutComponent,
    ShopComponent,
    BlogComponent,
    ContactComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    WishlistComponent,
    BlogDeatilsComponent,
    AcountComponent,
    UserProfileComponent,
    ForgetPasswordComponent,
    BannerComponent,
    PaymentSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    NgxSpinnerModule 

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
