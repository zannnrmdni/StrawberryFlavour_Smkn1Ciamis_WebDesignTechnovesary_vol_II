<?php

namespace App\Core;

final class Validator
{
    /** @var array<string, string> */
    private array $errors = [];

    /** @var array<string, string> */
    private array $labels;

    public function __construct(
        private array $data,
        private array $rules,
        array $labels = []
    ) {
        $this->labels = $labels;
    }

    public function validate(): bool
    {
        $this->errors = [];

        foreach ($this->rules as $field => $ruleString) {
            $value = $this->data[$field] ?? null;
            $value = is_string($value) ? trim($value) : $value;
            $rules = explode('|', $ruleString);
            $label = $this->labels[$field] ?? $field;

            foreach ($rules as $rule) {
                [$name, $argument] = array_pad(explode(':', $rule, 2), 2, null);
                $empty = $value === null || $value === '';

                if ($name === 'required' && $empty) {
                    $this->errors[$field] = $label . ' wajib diisi.';
                    break;
                }

                if ($empty) {
                    continue;
                }

                switch ($name) {
                    case 'email':
                        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                            $this->errors[$field] = $label . ' harus berupa alamat email yang valid, misalnya nama@contoh.com.';
                        }
                        break;

                    case 'min':
                        if (is_string($value) && mb_strlen($value) < (int) $argument) {
                            $this->errors[$field] = sprintf('%s minimal %d karakter.', $label, (int) $argument);
                        }
                        break;

                    case 'max':
                        if (is_string($value) && mb_strlen($value) > (int) $argument) {
                            $this->errors[$field] = sprintf('%s maksimal %d karakter.', $label, (int) $argument);
                        }
                        break;

                    case 'numeric':
                        if (!is_numeric($value)) {
                            $this->errors[$field] = $label . ' harus berupa angka.';
                        }
                        break;

                    case 'in':
                        $allowed = explode(',', (string) $argument);
                        if (!in_array((string) $value, $allowed, true)) {
                            $this->errors[$field] = $label . ' berisi pilihan yang tidak dikenal.';
                        }
                        break;

                    case 'regex':
                        if (!preg_match((string) $argument, (string) $value)) {
                            $this->errors[$field] = $label . ' memiliki format yang belum benar.';
                        }
                        break;
                }

                if (isset($this->errors[$field])) {
                    break;
                }
            }
        }

        return $this->errors === [];
    }

    public function fails(): bool
    {
        return !$this->validate();
    }

    /** @return array<string, string> */
    public function errors(): array
    {
        if ($this->errors === []) {
            $this->validate();
        }
        return $this->errors;
    }

    public function firstError(): ?string
    {
        $errors = $this->errors();
        return $errors === [] ? null : reset($errors);
    }
}
