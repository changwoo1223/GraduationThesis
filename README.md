# GraduationThesis
학부졸업논문 - 데이터베이스 접근방식별 SQL Injection 취약점 분석
> **Analysis of SQL Injection Vulnerabilities by Database Access Methods**  
> 학부 졸업논문 연구 프로젝트 (Express & Node.js / MySQL)

---

## 📌 연구 배경 및 목적
웹 애플리케이션 보안에서 가장 치명적이고 빈번하게 발생하는 **SQL Injection(SQLi)** 공격에 대해, 대표적인 3가지 데이터베이스 접근 방식별 취약성을 실증 분석했습니다.

본 연구에서는 문자열 결합 방식의 위험성, 블랙리스트 기반 입력 필터링의 우회 가능성(Bypass), 그리고 매개변수화 쿼리(Prepared Statement)를 통한 근본적인 방어 메커니즘을 백엔드 코드로 구현하고 검증했습니다.

---

## 🏗️ 시스템 구조 및 연구 대상 (Level 1~3)

| 구분 | 단계 (Level) | 데이터베이스 접근 방식 | SQL Injection 공격 가능 여부 |
| :---: | :---: | :--- | :---: |
| **Level 1** | Insecure Raw Query | 문자열 결합 (String Concatenation) | **공격 가능 (취약)** |
| **Level 2** | Filtered Query | 블랙리스트 기반 입력값 필터링 (Escape Filter) | **우회 가능 (취약)** |
| **Level 3** | Prepared Statement | 매개변수화 쿼리 (Parameterized Query) | **완전 방어 (안전)** |

---

## ✨ 주요 기능 및 API 라우트 (`routes/`)

### 1. 사용자 로그인 및 SQLi 실증 (`routes/login.js` | `public/login.html`)
* **Level 1 (`/level1`)**: 문자열 결합 쿼리로, 로그인 폼 입력값 조작을 통한 인증 우회 실증
* **Level 2 (`/level2`)**: 블랙리스트 기반 키워드 치환(Escape) 필터링 우회 시나리오 검증
* **Level 3 (`/level3`)**: Prepared Statement 적용을 통한 SQL Injection 완전 차단 검증

### 2. 회원가입 및 데이터베이스 연동 (`routes/register.js` | `public/register.html`)
* 사용자 계정 정보(`users` 테이블) 신규 등록 및 중복 검사 처리

---

## 🛠 기술 스택 (Tech Stack)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express_v5.2-000000?style=flat-square&logo=Express&logoColor=white)
![Axios](https://img.shields.io/badge/Axios_v1.16-5A29E4?style=flat-square&logo=Axios&logoColor=white)
![Body-Parser](https://img.shields.io/badge/Body--Parser_v2.2-339933?style=flat-square&logo=Node.js&logoColor=white)

### Database
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)

---

## 🗄 데이터베이스 구조 (Database Schema)

`graduation_project_db` 데이터베이스는 일반 사용자 정보 및 관리자/보안 토큰 정보를 관리하는 2개의 핵심 테이블로 구성되어 있습니다.

```sql
CREATE DATABASE graduation_project_db;
USE graduation_project_db;

CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '사용자 고유 번호',
    `username` VARCHAR(50) NOT NULL COMMENT '사용자 로그인 ID',
    `password` VARCHAR(255) NOT NULL COMMENT '패스워드 해시',
    `email` VARCHAR(100) DEFAULT NULL COMMENT '이메일 주소',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `admin` (
    `admin_id` INT NOT NULL AUTO_INCREMENT COMMENT '관리자 고유 번호',
    `admin_name` VARCHAR(50) NOT NULL COMMENT '관리자 로그인 ID',
    `password` VARCHAR(255) NOT NULL COMMENT '패스워드',
    `security_token` VARCHAR(100) NOT NULL COMMENT '최고 권한 세션/OTP 토큰',
    PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```