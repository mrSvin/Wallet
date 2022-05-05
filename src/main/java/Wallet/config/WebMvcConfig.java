package Wallet.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    /**
     * Данный метод помогает Spring обнаруживать пути к файлам
     */
    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {

        String  location = "file:src/main/resources/upload/";
        registry.addResourceHandler("/upload/**")
                .addResourceLocations(location);

    }
}
