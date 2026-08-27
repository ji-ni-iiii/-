/* ======================================================
   GLOBAL DATA
====================================================== */

let contracts =
  JSON.parse(
    localStorage.getItem("contracts") || "[]"
  );

let documents =
  JSON.parse(
    localStorage.getItem("documents") || "[]"
  );

let reviews =
  JSON.parse(
    localStorage.getItem("reviews") || "[]"
  );


/* ======================================================
   UTILITIES
====================================================== */

function saveData() {

  localStorage.setItem(
    "contracts",
    JSON.stringify(contracts)
  );

  localStorage.setItem(
    "documents",
    JSON.stringify(documents)
  );

  localStorage.setItem(
    "reviews",
    JSON.stringify(reviews)
  );
}


function formatNumber(value) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return "";

  }

  const number =
    String(value)
      .replace(/,/g, "")
      .replace(/[^\d]/g, "");

  if (!number) {

    return "";

  }

  return Number(number)
    .toLocaleString("ko-KR");
}


function parseNumber(value) {

  return Number(
    String(value || "")
      .replace(/,/g, "")
      .replace(/[^\d]/g, "")
  ) || 0;

}


function money(value) {

  return Number(value || 0)
    .toLocaleString("ko-KR")
    + "원";

}


function createId() {

  return Date.now().toString()
    + Math.random()
      .toString(36)
      .substring(2);

}


/* ======================================================
   NUMBER INPUT
====================================================== */

document
  .querySelectorAll(".money-input")
  .forEach(input => {

    input.addEventListener(
      "input",
      function () {

        this.value =
          formatNumber(this.value);

      }
    );

  });


/* ======================================================
   NAVIGATION
====================================================== */

document
  .querySelectorAll(".nav-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const target =
          button.dataset.page;

        document
          .querySelectorAll(".nav-btn")
          .forEach(btn =>
            btn.classList.remove("active")
          );

        button.classList.add("active");

        document
          .querySelectorAll(".page")
          .forEach(page =>
            page.classList.remove("active")
          );

        document
          .getElementById(target)
          .classList.add("active");

        refreshSelectors();

      }
    );

  });


/* ======================================================
   CONTRACT CREATION
====================================================== */

document
  .getElementById("saveContract")
  .addEventListener(
    "click",
    createContract
  );


function createContract() {

  const contractNo =
    document
      .getElementById("contractNo")
      .value
      .trim();

  const name =
    document
      .getElementById("contractName")
      .value
      .trim();

  const amount =
    parseNumber(
      document
        .getElementById("contractAmount")
        .value
    );

  if (!name) {

    alert("계약명을 입력하세요.");

    return;

  }


  const contract = {

    id:
      createId(),

    contractNo,

    name,

    type:
      document
        .getElementById("contractType")
        .value,

    method:
      document
        .getElementById("contractMethod")
        .value,

    amount,

    period:
      document
        .getElementById("contractPeriod")
        .value,

    description:
      document
        .getElementById("contractDescription")
        .value,

    createdAt:
      new Date().toISOString()

  };


  contracts.push(contract);

  saveData();

  document
    .getElementById("contractMessage")
    .innerHTML =

    `<div class="notice">
      계약이 저장되었습니다.
    </div>`;


  refreshAll();

}


/* ======================================================
   CONTRACT TABLE
====================================================== */

function renderContracts() {

  const tbody =
    document
      .getElementById("contractTable");

  if (!contracts.length) {

    tbody.innerHTML =
      `<tr>
        <td colspan="5">
          등록된 계약이 없습니다.
        </td>
      </tr>`;

    return;

  }


  tbody.innerHTML =
    contracts
      .map(contract =>

        `<tr>

          <td>
            ${escapeHtml(
              contract.contractNo
            )}
          </td>

          <td>
            ${escapeHtml(
              contract.name
            )}
          </td>

          <td>
            ${money(
              contract.amount
            )}
          </td>

          <td>
            ${escapeHtml(
              contract.period
            )}
          </td>

          <td>
            <span class="review-status status-ok">
              등록
            </span>
          </td>

        </tr>`

      )
      .join("");

}


/* ======================================================
   SELECT BOXES
====================================================== */

function refreshSelectors() {

  const ids = [

    "documentContract",
    "legalContract",
    "taxContract"

  ];


  ids.forEach(id => {

    const select =
      document.getElementById(id);

    if (!select) return;


    select.innerHTML =

      contracts
        .map(contract =>

          `<option value="${contract.id}">

            ${escapeHtml(
              contract.contractNo
            )}
            -
            ${escapeHtml(
              contract.name
            )}

          </option>`

        )
        .join("");

  });

}


/* ======================================================
   DOCUMENT UPLOAD
====================================================== */

document
  .getElementById("uploadButton")
  .addEventListener(
    "click",
    uploadDocuments
  );


function uploadDocuments() {

  const contractId =
    document
      .getElementById("documentContract")
      .value;

  const files =
    document
      .getElementById("documentFiles")
      .files;


  if (!contractId) {

    alert("계약을 선택하세요.");

    return;

  }


  if (!files.length) {

    alert("파일을 선택하세요.");

    return;

  }


  [...files].forEach(file => {

    documents.push({

      id:
        createId(),

      contractId,

      fileName:
        file.name,

      fileSize:
        file.size,

      type:
        file.type,

      uploadedAt:
        new Date().toISOString(),

      /*
      실제 Firebase Storage 연동 후
      downloadURL이 저장됩니다.
      */

      status:
        "업로드 완료"

    });

  });


  saveData();

  renderDocuments();

  updateDashboard();

  alert(
    "문서가 등록되었습니다."
  );

}


function renderDocuments() {

  const box =
    document
      .getElementById(
        "uploadedDocuments"
      );


  const html =
    documents
      .map(doc => {

        const contract =
          contracts.find(
            c =>
              c.id === doc.contractId
          );


        return `

          <div class="review-card">

            <strong>
              📄
              ${escapeHtml(
                doc.fileName
              )}
            </strong>

            <p>
              계약:
              ${contract
                ? escapeHtml(
                    contract.name
                  )
                : "-"
              }
            </p>

            <span class="review-status status-ok">
              ${doc.status}
            </span>

          </div>

        `;

      })
      .join("");


  box.innerHTML =
    html ||
    "<p>업로드된 문서가 없습니다.</p>";

}


/* ======================================================
   LEGAL REVIEW
====================================================== */

document
  .getElementById(
    "legalReviewButton"
  )
  .addEventListener(
    "click",
    runLegalReview
  );


function runLegalReview() {

  const contractId =
    document
      .getElementById(
        "legalContract"
      )
      .value;


  const contract =
    contracts.find(
      c => c.id === contractId
    );


  if (!contract) {

    alert(
      "검토할 계약을 선택하세요."
    );

    return;

  }


  /*
  ------------------------------------------
  Rule Matching
  ------------------------------------------
  실제 운영에서는 여기서

  1. 계약서 AI 추출
  2. 법령 검색
  3. 공단 규정 검색
  4. 판례 검색
  5. AI 분석

  을 수행합니다.
  */


  const text =

    `${contract.name}
     ${contract.type}
     ${contract.method}
     ${contract.description}`;


  const matchedRules =
    LEGAL_RULES.filter(
      rule =>
        rule.keywords.some(
          keyword =>
            text.includes(keyword)
        )
    );


  const status =
    matchedRules.length
      ? "보완 필요"
      : "판단 불가";


  const review = {

    id:
      createId(),

    contractId,

    type:
      "법적검토",

    status,

    summary:
      matchedRules.length
        ? "관련 법령 후보가 확인되었습니다. 실제 계약서 조항 및 최신 법령을 대조해야 합니다."
        : "현재 등록된 Rule DB에서 직접적인 근거를 찾지 못했습니다.",

    sources:
      matchedRules,

    createdAt:
      new Date().toISOString()

  };


  reviews.push(review);

  saveData();

  renderLegalResult(review);

  renderReport(review);

  updateDashboard();

}


function renderLegalResult(review) {

  const box =
    document
      .getElementById(
        "legalResult"
      );


  box.innerHTML = `

    <div class="review-card">

      <h3>
        AI 법적검토 결과
      </h3>

      <span class="
        review-status
        ${getStatusClass(
          review.status
        )}
      ">

        ${review.status}

      </span>


      <p>

        ${escapeHtml(
          review.summary
        )}

      </p>


      <h4>
        관련 법령
      </h4>


      ${renderSources(
        review.sources
      )}

    </div>

  `;

}


/* ======================================================
   TAX REVIEW
====================================================== */

document
  .getElementById(
    "taxReviewButton"
  )
  .addEventListener(
    "click",
    runTaxReview
  );


function runTaxReview() {

  const contractId =
    document
      .getElementById(
        "taxContract"
      )
      .value;


  const acquisitionDate =
    document
      .getElementById(
        "acquisitionDate"
      )
      .value;


  const contract =
    contracts.find(
      c => c.id === contractId
    );


  if (!contract) {

    alert(
      "계약을 선택하세요."
    );

    return;

  }


  if (!acquisitionDate) {

    alert(
      "취득일을 입력하세요."
    );

    return;

  }


  /*
  ============================================
  취득세 Rule 검색
  ============================================

  핵심:

  사용자가 세율을 직접 입력하지 않습니다.

  취득일 + 계약/공사정보를 기반으로
  TAX_RULES에서 적용 후보를 검색합니다.

  실제 운영에서는 이 부분을
  Firebase Firestore의 최신 법령 DB와
  백엔드 Rule Engine으로 교체합니다.
  */


  const matchedRules =
    TAX_RULES.filter(rule => {

      const date =
        new Date(
          acquisitionDate
        );

      const from =
        new Date(
          rule.effectiveFrom
        );

      const to =
        rule.effectiveTo
          ? new Date(
              rule.effectiveTo
            )
          : null;


      return (
        date >= from &&
        (!to || date <= to)
      );

    });


  /*
  실제 세율이 공식 검증되어
  DB에 입력되기 전에는
  임의의 세율을 사용하지 않습니다.
  */


  const taxRateRule =
    matchedRules.find(
      rule =>
        rule.category ===
        "일반 취득"
    );


  let status =
    "추가검토";


  if (!taxRateRule) {

    status =
      "판단 불가";

  }


  /*
  ------------------------------------------
  과세표준 후보
  ------------------------------------------

  현재는 계약금액을 후보값으로 사용합니다.

  실제 버전에서는 준공내역서 Excel을
  분석해서 항목별로 분리해야 합니다.
  */


  const taxBase =
    contract.amount;


  const taxRate =
    taxRateRule &&
    typeof taxRateRule.rate ===
      "number"

      ? taxRateRule.rate

      : null;


  const taxAmount =
    taxRate !== null
      ? taxBase * taxRate
      : null;


  const review = {

    id:
      createId(),

    contractId,

    type:
      "취득세",

    status,

    acquisitionDate,

    taxBase,

    taxRate,

    taxAmount,

    sources:
      matchedRules,

    createdAt:
      new Date().toISOString()

  };


  reviews.push(review);

  saveData();

  renderTaxResult(review);

  renderReport(review);

  updateDashboard();

}


function renderTaxResult(review) {

  const box =
    document
      .getElementById(
        "taxResult"
      );


  const rateText =
    review.taxRate !== null

      ? (
          review.taxRate * 100
        ).toFixed(3)
        + "%"

      : "자동 확정 불가";


  const amountText =
    review.taxAmount !== null

      ? money(
          review.taxAmount
        )

      : "세율 확인 후 산출";


  box.innerHTML = `

    <div class="review-card">

      <h3>
        취득세 자동 검토 결과
      </h3>


      <span class="
        review-status
        ${getStatusClass(
          review.status
        )}
      ">

        ${review.status}

      </span>


      <div class="tax-summary">

        <div class="tax-box">

          <span>
            과세표준 후보
          </span>

          <strong>
            ${money(
              review.taxBase
            )}
          </strong>

        </div>


        <div class="tax-box">

          <span>
            적용 세율
          </span>

          <strong>
            ${rateText}
          </strong>

        </div>


        <div class="tax-box">

          <span>
            예상 취득세
          </span>

          <strong>
            ${amountText}
          </strong>

        </div>

      </div>


      <h4>
        세율 및 산출 근거
      </h4>


      ${renderSources(
        review.sources
      )}


      <div class="notice">

        <strong>
          담당자 확인 필요
        </strong>

        <p>

          현재 시스템에 등록된 법령 Rule만을
          사용한 1차 검토입니다.

          실제 신고 전에는 취득물건,
          취득원인, 취득일, 감면 및 중과 여부와
          당시 시행 법령을 반드시 확인해야 합니다.

        </p>

      </div>

    </div>

  `;

}


/* ======================================================
   SOURCES
====================================================== */

function renderSources(
  sources
) {

  if (!sources.length) {

    return `
      <div class="notice">
        확인 가능한 법령 근거가 없습니다.
      </div>
    `;

  }


  return sources
    .map(source =>

      `

      <div class="source-box">

        <strong>
          ${escapeHtml(
            source.lawName
          )}
        </strong>

        <p>

          ${escapeHtml(
            source.article
          )}

        </p>

        <small>

          출처:
          ${escapeHtml(
            source.source
          )}

          <br>

          <a
            href="${source.sourceUrl}"
            target="_blank"
            rel="noopener">

            공식 법령 확인

          </a>

        </small>

      </div>

      `

    )
    .join("");

}


/* ======================================================
   REPORT
====================================================== */

function renderReport(review) {

  const box =
    document
      .getElementById(
        "reportContent"
      );


  if (review.type === "취득세") {

    box.innerHTML = `

      <h2>
        취득세 검토보고
      </h2>

      <p>
        검토일:
        ${new Date(
          review.createdAt
        ).toLocaleString(
          "ko-KR"
        )}
      </p>

      <hr>

      <h3>
        검토 결과
      </h3>

      <p>
        상태:
        <strong>
          ${review.status}
        </strong>
      </p>

      <p>
        과세표준 후보:
        ${money(
          review.taxBase
        )}
      </p>

      <p>
        적용 세율:
        ${
          review.taxRate !== null
            ? review.taxRate * 100 + "%"
            : "확인 필요"
        }
      </p>

      <p>
        산출세액:
        ${
          review.taxAmount !== null
            ? money(
                review.taxAmount
              )
            : "확인 필요"
        }
      </p>

      <h3>
        법적 근거
      </h3>

      ${renderSources(
        review.sources
      )}

    `;

  } else {

    box.innerHTML = `

      <h2>
        계약 법적검토 보고
      </h2>

      <p>
        결과:
        <strong>
          ${review.status}
        </strong>
      </p>

      <p>
        ${escapeHtml(
          review.summary
        )}
      </p>

      <h3>
        관련 법령
      </h3>

      ${renderSources(
        review.sources
      )}

    `;

  }

}


/* ======================================================
   DASHBOARD
====================================================== */

function updateDashboard() {

  document
    .getElementById(
      "contractCount"
    )
    .textContent =
      contracts.length;


  document
    .getElementById(
      "documentCount"
    )
    .textContent =
      documents.length;


  document
    .getElementById(
      "legalCount"
    )
    .textContent =

      reviews.filter(
        r =>
          r.type ===
          "법적검토"
      ).length;


  document
    .getElementById(
      "taxCount"
    )
    .textContent =

      reviews.filter(
        r =>
          r.type ===
          "취득세"
      ).length;

}


/* ======================================================
   STATUS
====================================================== */

function getStatusClass(
  status
) {

  if (
    status ===
    "적합"
  ) {

    return "status-ok";

  }

  if (
    status ===
    "보완 필요" ||
    status ===
    "추가검토"
  ) {

    return "status-warning";

  }

  if (
    status ===
    "부적합 가능성"
  ) {

    return "status-danger";

  }

  return "status-neutral";

}


/* ======================================================
   ESCAPE HTML
====================================================== */

function escapeHtml(
  value
) {

  return String(
    value ?? ""
  ).replace(
    /[&<>"']/g,
    char => ({

      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"

    }[char])
  );

}


/* ======================================================
   INITIALIZE
====================================================== */

function refreshAll() {

  renderContracts();

  refreshSelectors();

  renderDocuments();

  updateDashboard();

}


document
  .getElementById(
    "printReport"
  )
  .addEventListener(
    "click",
    () => window.print()
  );


refreshAll();
