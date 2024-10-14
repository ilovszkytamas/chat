package com.chatbackend.exception;

import com.chatbackend.dto.error.FieldErrorDTO;
import com.chatbackend.enums.ErrorType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    ErrorType errorType;
    List<FieldErrorDTO> fieldErrors;
}
