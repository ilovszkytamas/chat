package com.chatbackend.exception;

import com.chatbackend.dto.error.FieldErrorDTO;
import com.chatbackend.enums.ErrorType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(final MethodArgumentNotValidException ex) {
        List<FieldErrorDTO> errors = ex.getBindingResult().getFieldErrors()
                .stream().map(fieldError -> {
                    return FieldErrorDTO
                           .builder()
                           .fieldName(fieldError.getField())
                            .errorMessage(fieldError.getDefaultMessage())
                            .build();
                }).collect(Collectors.toList());

        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }



    private ErrorResponse getErrorsMap(final List<FieldErrorDTO> errors) {
        return ErrorResponse
                .builder()
                .fieldErrors(errors)
                .errorType(ErrorType.FIELD)
                .build();
    }

}