package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Price;
import com.example.BBP_Backend.Repository.PriceRepository;
import com.example.BBP_Backend.Response.PriceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PriceService {
    private final PriceRepository priceRepository;

    public List<Price> getPriceByClubId(int clubId) {
        return priceRepository.getPricesByClubId(clubId);
    }

    public List<PriceResponse> getCustomPrices(int clubId) {

        List<PriceResponse> result = new ArrayList<>();
        for (Price price : priceRepository.getPricesByClubId(clubId)
        ) {
            result.add(new PriceResponse(
                    price.getSlot().getSlotId(),
                    price.getTableType().getTableTypeId(),
                    price.getPrice()
            ));
        }
        return result;
    }
}